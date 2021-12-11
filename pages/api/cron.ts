// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import customParseFormat from "dayjs/plugin/customParseFormat";
import chromium from "chrome-aws-lambda";
import dayjs from "dayjs";
import {Page} from "puppeteer-core";
import { Prisma, House } from "@prisma/client";
import prisma from "../../lib/prisma";

dayjs.extend(customParseFormat);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.time("cron");
  await eLeilaoRobot();
  console.timeEnd("cron");
  res.status(200).json({ message: "Success" });
}

const eLeilaoRobot = async () => {
  console.log("E-leilao Bot Starting...");
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    //headless: false,
    //slowMo: 100,  //slow down by 250ms
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(90000);

  const houses = await prisma.house.findMany({
    where: {
      website: "e-leiloes",
    },
    select: {
      houseId: true,
      currentBid: true,
    },
  });

  const houseIds = houses.map(({ houseId }) => {
    return houseId;
  });

  // 1 -> value for apartment, 2 -> value for house
  const houseTypeValues = ["1", "2"];

  for (const houseTypeValue of houseTypeValues) {
    let housesUpdated: number = 0;
    await page.bringToFront();
    await page.goto("https://www.e-leiloes.pt/pesquisaavancada.aspx");

    await page.waitForSelector("select#CPH_Body_P_Subtipo");
    await page.select("select#CPH_Body_P_Subtipo", houseTypeValue);
    await page.click("#CPH_Body_BT_Pesquisar");
    await page.waitForSelector("#DataMore span");
    await page.waitForTimeout(5000);

    await page.click("#DataMore span");
    const totalResults = await page.$eval(
      "#CPH_Body_Panel_Conteudo input[name=TotalDeResultados]",
      (el) => (el as HTMLInputElement).value
    );
    let currentResults = await page.$eval(
      "#CPH_Body_Panel_Conteudo input[name=ContagemDeResultados]",
      (el) => (el as HTMLInputElement).value
    );

    //console.log("currentResults", currentResults)
    //console.log("totalResults", totalResults)

    console.log("--------------\nStart scrolling!");
    while (parseInt(currentResults) < parseInt(totalResults)) {
      const delta = Math.random() * (230 - 140) + 140;
      await page.mouse.wheel({ deltaY: delta });
      await page.mouse.wheel({ deltaY: delta });
      currentResults = await page.$eval(
        "#CPH_Body_Panel_Conteudo input[name=ContagemDeResultados]",
        (el) => (el as HTMLInputElement).value
      );
    }
    console.log("End of scroll!");
    await page.waitForTimeout(5000);
    await page.waitForSelector(".PaginacaoBemArea");
    const houseItems = await page.$$(".PaginacaoBemArea");
    console.log("Total House Items:", houseItems.length);

    let house: House[] = [];

    for (const item of houseItems) {
      const headerHouseId = await item.$eval(
        ".PaginacaoBemCabecalho01 b",
        (el) => (el as HTMLElement).innerText
      );

      // If house is already on DB, check if currentBid was updated. If so update the db, else continue to next
      if (houseIds.includes(headerHouseId)) {
        const currentHouse = houses.find((el) => el.houseId === headerHouseId);
        const hasCurrentBid = (
          await item.$eval(
            ".PaginacaoBemLanceAtual",
            (el) => (el as HTMLElement).innerText
          )
        ).includes("LANCE ATUAL: ");
        //console.log("hasCurrentBid", hasCurrentBid)
        if (hasCurrentBid) {
          const currentBid = (
            await item.$eval(
              ".PaginacaoBemLanceAtual",
              (el) => (el as HTMLElement).innerText
            )
          )
            .substring("LANCE ATUAL: ".length - 1)
            .replace(/[€\s]/g, "")
            .replace(",", ".");
          //console.log("hasCurrentBidChanged", currentHouse?.currentBid?.toNumber() !== parseFloat(currentBid))
          if (currentHouse?.currentBid?.toNumber() !== parseFloat(currentBid)) {
            console.log(
              `Updating house ${currentHouse?.houseId} Current Bid...`
            );
            await prisma.house.update({
              where: {
                houseId: headerHouseId,
              },
              data: {
                currentBid,
              },
            });
            housesUpdated = housesUpdated + 1;
            console.log(`${currentHouse?.houseId} Updated!`);
          }
        }
      } else {
        try {
          //console.log("House doesn't exist on the DB yet. Fetching data...")
          const housePage = await browser.newPage();
          const newHouseUrl = await item.$eval(
            "a",
            (el) => (el as HTMLAnchorElement).href
          );
          await housePage.goto(newHouseUrl);
          await housePage.bringToFront();

          const imagesDiv = await housePage.$$(
            ".DIV_BannerIMG:not(.DIV_BannerIMG.bx-clone)"
          );
          const images: string[] = [];
          for (const image of imagesDiv) {
            const backgroundImage: string | undefined = await (
              await (
                await image.getProperty("style")
              )?.getProperty("backgroundImage")
            )?.jsonValue();
            const url = backgroundImage?.substring(
              backgroundImage?.indexOf('"') + 1,
              backgroundImage?.lastIndexOf('"')
            );
            if (url) {
              images.push(`https://www.e-leiloes.pt/${url}`);
            }
          }

          const houseId = await housePage.$eval(
            "#CPH_Body_DIV_Coluna_03 div:first-child div:last-child b",
            (el) => (el as HTMLElement).innerText
          );
          const title = await housePage.$eval(
            "#CPH_Body_DIV_Titulo div b",
            (el) => (el as HTMLElement).innerText
          );
          const description = await housePage.$eval(
            "#InfoBemDescricao div:nth-child(13) div:last-child",
            (el) => (el as HTMLElement).innerText
          );
          const area = await housePage.$eval(
            "#InfoBemDescricao div:nth-child(11) div:last-child",
            (el) =>
              parseInt(
                (el as HTMLElement).innerText.substr(
                  0,
                  (el as HTMLElement).innerText.indexOf(" ")
                )
              )
          );
          const typology = await housePage.$eval(
            "#InfoBemDescricao div:nth-child(5) div:last-child",
            (el) => (el as HTMLElement).innerText
          );
          const houseType = await housePage.$eval(
            "#InfoBemDescricao div:nth-child(3) b",
            (el) => (el as HTMLElement).innerText
          );
          const locationDiv = await getEleilaoLocation(housePage);
          const locationCities = await locationDiv?.$eval(
            `div:nth-child(6)`,
            (el) => (el as HTMLElement).innerText.trim()
          );
          const district = locationCities
            ?.substring(
              "Distrito: ".length,
              locationCities.indexOf("Concelho:")
            )
            .trim() as string;
          const county = locationCities
            ?.substring(
              locationCities?.indexOf("Concelho: ") + "Concelho: ".length,
              locationCities?.indexOf("Freguesia")
            )
            .trim() as string;
          const parish = locationCities?.substring(
            locationCities?.indexOf("Freguesia: ") + "Freguesia: ".length
          ) as string;
          const locationAddress = await locationDiv?.$eval(
            `div:nth-child(3)`,
            (el) => (el as HTMLElement).innerText.trim()
          );
          const address = locationAddress
            ?.substring("Morada: ".length, locationAddress.indexOf("Número:"))
            .trim();
          const addressNumber = locationAddress?.includes("Número:")
            ? locationAddress
                ?.substring(
                  locationAddress?.indexOf("Número:") + "Número: ".length,
                  locationAddress?.indexOf("Andar") > 0
                    ? locationAddress?.indexOf("Andar")
                    : locationAddress?.length
                )
                .trim()
            : null;
          const addressFloor = locationAddress?.includes("Andar:")
            ? locationAddress
                ?.substring(
                  locationAddress?.indexOf("Andar: ") + "Andar: ".length
                )
                .trim()
            : null;
          const locationPostCode = await locationDiv?.$eval(
            `div:nth-child(4)`,
            (el) =>
              (el as HTMLElement).innerText
                .substring("Código Postal:".length)
                .trim()
          );
          const locationLatitude = await locationDiv?.$eval(
            `div:nth-child(8)`,
            (el) =>
              (el as HTMLElement).innerText
                .substring("GPS Latitude:".length)
                .trim()
          );
          const locationLongitude = await locationDiv?.$eval(
            `div:nth-child(9)`,
            (el) =>
              (el as HTMLElement).innerText
                .substring("GPS Longitude:".length)
                .trim()
          );
          const marketValue = await housePage.$eval(
            "#CPH_Body_DIV_Coluna_03 div:nth-child(3) div:first-child div:last-child b",
            (el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );
          const minimumPrice = await housePage.$eval(
            "#CPH_Body_DIV_Coluna_03 div:nth-child(3) div:nth-child(5) div:last-child b",
            (el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );
          const startingPrice = await housePage.$eval(
            "#CPH_Body_DIV_Coluna_03 div:nth-child(3) div:nth-child(3) div:last-child b",
            (el) =>
              (el as HTMLElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );
          const currentBid = await housePage.$eval(
            "#CPH_Body_UP_LanceAtual div:nth-child(2) div:first-child:not(b)",
            (el) =>
              (el as HTMLElement).innerText
                .substring("P. Mais Alta: ".length - 1)
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );
          const startsAt = await housePage.$eval(
            "#CPH_Body_UP_RelogioDatas div:nth-child(2) div:first-child div:nth-child(2) b",
            (el) => (el as HTMLElement).innerText.trim().replaceAll(" ", "")
          );
          const endsAt = await housePage.$eval(
            "#CPH_Body_UP_RelogioDatas div:nth-child(2) div:nth-child(3) div:nth-child(2) b",
            (el) => (el as HTMLElement).innerText.trim().replaceAll(" ", "")
          );
          const startsAtDate = dayjs(startsAt, "DD-MM-YYYY HH:mm:ss").toDate();
          const endsAtDate = dayjs(endsAt, "DD-MM-YYYY HH:mm:ss").toDate();
          const url = await housePage.url();
          house.push({
            houseId,
            images,
            title,
            description,
            area,
            typology,
            houseType,
            district,
            county,
            parish,
            marketValue: new Prisma.Decimal(marketValue),
            minimumPrice: new Prisma.Decimal(minimumPrice),
            startingPrice: new Prisma.Decimal(startingPrice),
            currentBid: new Prisma.Decimal(currentBid),
            startsAt: startsAtDate,
            endsAt: endsAtDate,
            website: "e-leiloes",
            createdAt: new Date(),
            updatedAt: new Date(),
            addressLine1: address as string,
            addressNumber,
            addressFloor,
            postcode: locationPostCode as string,
            latitude: locationLatitude as string,
            longitude: locationLongitude as string,
            currentBidHistory: [],
            url,
          });
          //console.log("House:", house[house.length - 1])
          await housePage.close();
        } catch (err) {
          console.log("Error:", err);
        }
      }
    }
    try {
      await prisma.house.createMany({
        data: house,
        skipDuplicates: true,
      });
      console.log("Houses Added:", house.length);
      console.log("Houses Updated:", housesUpdated);
    } catch (err) {
      console.log("Error Saving Houses:", err);
    }
  }
  console.log("E-leilao Bot Finished successfully.");
  await browser.close();
};

const getEleilaoLocation = async (page: Page) => {
  let locationDiv = 15;
  let locationFound = false;
  while (!locationFound) {
    const locationHeader = await page.$eval(
      `#InfoBemDescricao div:nth-child(${locationDiv.toString()}) div:first-child b`,
      (el) => (el as HTMLElement).innerText.trim()
    );
    if (locationHeader === "Localização:") {
      locationFound = true;
    } else {
      locationDiv = locationDiv + 2;
    }
  }
  return await page.$(
    `#InfoBemDescricao div:nth-child(${locationDiv.toString()})`
  );
};
