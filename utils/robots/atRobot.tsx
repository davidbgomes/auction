import puppeteer, { Page } from "puppeteer";
import { Prisma, House } from "@prisma/client";
import prisma from "../../lib/prisma";
import dayjs from "dayjs";
import { formatTitle } from "../../utils/helpers";

export const atRobot = async () => {
  console.log("AT Bot Starting...");
  const browser = await puppeteer.launch({
    //args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //defaultViewport: chromium.defaultViewport,
    //executablePath: await chromium.executablePath,
    //headless: false,
    //ignoreHTTPSErrors: true,
    //slowMo: 100,  //slow down by 250ms
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(90000);

  const houses = await prisma.house.findMany({
    where: {
      website: "at",
    },
    select: {
      houseId: true,
      currentBid: true,
    },
  });

  const houseIds = houses.map(({ houseId }) => houseId);

  //const progressBar = new cliProgress.SingleBar({format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'}, cliProgress.Presets.shades_classic);

  let housesUpdated: number = 0;
  await page.goto(
    "https://vendas.portaldasfinancas.gov.pt/bens/consultaVendasCurso.action?page=1&freguesia=&concelho=&distrito=&dataMin=&maximo=&tipoConsulta=02&dataMax=&minimo=&modalidade=04&tipoBem="
  );
  await page.bringToFront();
  await page.waitForTimeout(5000);
  const titleHeader = await page.$eval(".info-table-title.nowrap.w100", (el) =>
    (el as HTMLInputElement).innerText.trim()
  );
  let totalResults = parseInt(
    titleHeader.substring(titleHeader.lastIndexOf(" ") + 1)
  );
  let currentResults = parseInt(
    titleHeader.substring(
      titleHeader.lastIndexOf("-") + 2,
      titleHeader.indexOf(" ", titleHeader.lastIndexOf("-") + 2)
    )
  );

  console.log(currentResults, "/", totalResults);

  let house: House[] = [];

  while (currentResults < totalResults) {
    await page.waitForTimeout(2000);
    const houseItems = await page.$$('table[summary="Lista de Vendas"]');
    await page.waitForTimeout(2000);
    for (let i = 0; i < houseItems.length; i++) {
      const typology = await houseItems[i].$eval(
        ".info-table-title.nowrap.w75",
        (el) => (el as HTMLElement).innerText.replace("T", "").trim()
      );
      const status = await houseItems[i].$eval(
        ".info-element span:nth-child(10)",
        (el) => (el as HTMLElement).innerText.trim()
      );
      if (!typology || status.toLowerCase() !== "em curso") {
        continue;
      } else {
        await page.waitForTimeout(5000);
        const houseId = await houseItems[i].$eval(
          ".info-element span:nth-child(2)",
          (el) => (el as HTMLElement).innerText
        );
        const atPage = await browser.newPage();
        const auctionUrl = `https://justica.portaldasfinancas.gov.pt/vendaleilaoel/redirecionar?codigoLeilao=${houseId}`;
        try {
          await atPage.goto(auctionUrl);
          await atPage.bringToFront();
          await atPage.waitForTimeout(5000);
          const loginPagePanel = await atPage.$(".authentication-panel");
          if (loginPagePanel) {
            console.log("Logging in...");
            await atPage.type(
              'input[name="username"]',
              process.env.AT_USERNAME as string,
              { delay: 200 }
            );
            await atPage.type(
              'input[name="password"]',
              process.env.AT_PASSWORD as string,
              { delay: 500 }
            );
            await atPage.click('button[name="sbmtLogin"]');
            await atPage.waitForTimeout(5000);
          }
          await atPage.click('button[type="submit"]');
          await atPage.waitForTimeout(5000);

          const dds = await atPage.$$("dd");
          //Check if house was already scrapped. If so, just update the currentBid, bidHistory & updatedAt
          if (houseIds.includes(houseId)) {
            const currentHouse = houses.find((el) => el.houseId === houseId);
            const currentBid = await dds[8].evaluate((el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s.]/g, "")
                .replace(",", ".")
            );
            const hasCurrentBid = !isNaN(parseFloat(currentBid));
            if (
              hasCurrentBid &&
              parseFloat(currentBid) !== currentHouse?.currentBid?.toNumber()
            ) {
              console.log("house updated!");
              await prisma.house.update({
                where: {
                  houseId,
                },
                data: {
                  currentBid,
                  currentBidHistory: {
                    push: currentBid,
                  },
                  updatedAt: new Date(),
                },
              });
            } else {
              console.log(
                "House already in db with same current bid, skipping.."
              );
            }
          } else {
            const description = await dds[0].evaluate(
              (el) => (el as HTMLElement).innerText
            );
            const location = (
              await dds[1].evaluate((el) => (el as HTMLElement).innerText)
            ).split("/");
            const district = location[0].trim();
            const county = location[1].trim();
            const parish = location[2].trim();
            const biddingPeriod = (
              await dds[6].evaluate((el) => (el as HTMLElement).innerText)
            ).split("a");
            const startsAtDate = dayjs(
              biddingPeriod[0].trim(),
              "YYYY-MM-DD HH:mm"
            ).toDate();
            const endsAtDate = dayjs(
              biddingPeriod[1].trim(),
              "YYYY-MM-DD HH:mm"
            ).toDate();
            const marketValue = await dds[7].evaluate((el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s.]/g, "")
                .replace(",", ".")
            );
            const currentBid = await dds[8].evaluate((el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s.]/g, "")
                .replace(",", ".")
            );

            const images = (await atPage.$$eval(".fullImgSlidesImages", (el) =>
              (el as HTMLElement[]).map((img) => img.getAttribute("src"))
            )) as string[];

            house.push({
              houseId,
              images,
              title: `Imóvel T${typology} - ${formatTitle(
                county
              )}, ${formatTitle(district)}`,
              description,
              area: 0,
              typology: `T${typology}`,
              houseType: null,
              district: district.toLowerCase(),
              county: county.toLowerCase(),
              parish: parish.toLowerCase(),
              marketValue: new Prisma.Decimal(marketValue),
              minimumPrice: null,
              startingPrice: null,
              currentBid: !isNaN(parseFloat(currentBid))
                ? new Prisma.Decimal(currentBid)
                : new Prisma.Decimal(0),
              startsAt: startsAtDate,
              endsAt: endsAtDate,
              website: "at",
              createdAt: new Date(),
              updatedAt: new Date(),
              addressLine1: null,
              addressNumber: null,
              addressFloor: null,
              postcode: null,
              latitude: null,
              longitude: null,
              currentBidHistory: !isNaN(parseFloat(currentBid))
                ? [new Prisma.Decimal(currentBid)]
                : [],
              url: auctionUrl,
            });
          }
          await atPage.close();
          //console.log("house", house);
        } catch {
          await atPage.close();
          continue;
        }
      }
    }
    await page.click('img[alt="Próximo"]');
    currentResults = currentResults + 10;
  }
  await browser.close();
  await prisma.house.createMany({
    data: house,
    skipDuplicates: true,
  });
};
