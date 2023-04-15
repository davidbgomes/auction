import puppeteer, { Page } from "puppeteer";
import { Prisma, House } from "@prisma/client";
import prisma from "../../lib/prisma";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import cities from "@/utils/data/cities.json";
var customParseFormat = require("dayjs/plugin/customParseFormat");

require("dayjs/locale/pt");
dayjs.extend(customParseFormat);

const PER_PAGE = 36;

export const leilosocRobot = async () => {
  console.log("Leilosoc Bot Starting...");
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, //slow down by 250ms
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(90000);

  const houses = await prisma.house.findMany({
    where: {
      website: "leilosoc",
    },
    select: {
      houseId: true,
      currentBid: true,
    },
  });

  const houseIds = houses.map(({ houseId }) => houseId);

  let housesUpdated: number = 0;
  await page.goto("https://www.leilosoc.com/list?country=PT&sell=online");
  await page.bringToFront();
  await page.waitForTimeout(3000);

  let currentResults = PER_PAGE;

  const totalResults = parseInt(
    await page.$eval(
      ".mr-3.mb-3 strong",
      (el) => (el as HTMLInputElement).innerText
    )
  );
  console.log("totalResults", totalResults);

  let house: House[] = [];

  while (currentResults < totalResults) {
    let houseItems = await page.$$("p.text.trunc-title a");

    for (const item of houseItems) {
      const truncatedTitle = await item.evaluate(
        (el) => (el as HTMLAnchorElement).innerText
      );
      if (
        !["moradia", "apartamento"].includes(
          truncatedTitle.substring(0, truncatedTitle.indexOf(" ")).toLowerCase()
        )
      ) {
        continue;
      }
      const auctionPage = await browser.newPage();
      const url: string | undefined = await (
        await item.getProperty("href")
      )?.jsonValue();
      if (!url) return null;
      await auctionPage.goto(url);
      await auctionPage.bringToFront();
      await auctionPage.waitForTimeout(2000);

      const houseId = await auctionPage.$eval("h3+small", (el) =>
        (el as HTMLDivElement).innerText.replace("Referência: ", "")
      );

      if (houseIds.includes(houseId)) {
        try {
          const currentBid = await auctionPage.$eval(
            ".table.bid-log .lot-currency.ng-star-inserted",
            (el) =>
              (el as HTMLDivElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );

          const currentHouse = houses.find((el) => el.houseId === houseId);

          if (currentHouse?.currentBid?.toNumber() !== parseFloat(currentBid)) {
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
            housesUpdated += 1;
          }
        } catch {
          continue;
        }
      } else {
        const title = await auctionPage.$eval(
          "h3",
          (el) => (el as HTMLElement).innerText
        );
        //console.log("title", title);

        const houseType = truncatedTitle
          .substring(0, truncatedTitle.indexOf(" "))
          .toLowerCase();
        //console.log("houseType", houseType);

        const typology =
          truncatedTitle.match(/([VT])\d/g)?.[0].replace("V", "T") || null;

        const images = (await auctionPage.$$eval(
          ".galleria-image img",
          (imgs) => imgs.map((el) => el.getAttribute("src"))
        )) as string[];
        //console.log("images", images);

        const description = await auctionPage.$eval(
          "#galleria+div",
          (el) => (el as HTMLDivElement).innerText
        );
        //console.log("description", description);

        const areaString = await auctionPage.$eval("span.h4.text-muted", (el) =>
          (el as HTMLDivElement).innerText.trim().replace(/[\s]/g, "")
        );
        const area = parseInt(areaString.substring(0, areaString.indexOf(",")));
        //console.log("area", area);

        const mapDiv = await auctionPage.$("div#map");
        const latitude =
          (await mapDiv?.evaluate((el) => el.getAttribute("lat"))) || "";
        const longitude =
          (await mapDiv?.evaluate((el) => el.getAttribute("long"))) || "";
        //console.log("lat:", latitude, "long:", longitude);

        const locationDiv = await auctionPage.$(
          ".col-xl-8.col-lg-8.truncate.col-intermediate-text"
        );
        let addressLine = await locationDiv?.$eval("div", (el) =>
          (el as HTMLDivElement).innerText.trim()
        );
        let addressNumber = "";
        if (addressLine?.includes(",")) {
          addressNumber = addressLine.substring(addressLine.indexOf(","));
          addressLine = addressLine.substring(0, addressLine.indexOf(","));
        }
        //console.log("addressLine", addressLine);
        //console.log("addressNumber", addressNumber);

        const postcodeLine = await await locationDiv?.$eval(
          "div:nth-child(2)",
          (el) => (el as HTMLDivElement).innerText.trim()
        );
        const postcode =
          postcodeLine?.substring(0, postcodeLine.indexOf(" ")) || "";
        //console.log("postcode", postcode);

        const countyString = truncatedTitle
          .substring(truncatedTitle.lastIndexOf("·") + 2)
          .trim();
        const county = countyString.includes(",")
          ? countyString.substring(0, countyString.indexOf(","))
          : countyString;
        //console.log("county", county);
        const countyCode = cities
          .find(({ name }) => name === county)
          ?.code.toString();
        const districtCode = parseInt(
          countyCode?.substring(0, countyCode.length === 3 ? 1 : 2) as string
        );
        const district =
          cities.find(({ code }) => code === districtCode)?.name || "";
        const parish =
          postcodeLine?.substring(postcodeLine.indexOf(" ") + 1) || "";
        //console.log("parish", parish);

        let currentBid: string = "";
        try {
          currentBid = await auctionPage.$eval(
            ".table.bid-log .lot-currency",
            (el) =>
              (el as HTMLDivElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
          );
        } catch {
          console.log("no currentBid");
        }
        //console.log("currentBid", currentBid);

        const valuesDiv = await auctionPage.$(".table.text-muted");

        const marketValue =
          (await valuesDiv?.$eval("tr:nth-child(3) td span", (el) =>
            (el as HTMLDivElement).innerText
              .replace(/[€\s]/g, "")
              .replace(",", ".")
          )) || "0";
        //console.log("marketValue", marketValue);

        let minimumPrice: string = "";
        try {
          minimumPrice =
            (await valuesDiv?.$eval("tr:nth-child(4) td span", (el) =>
              (el as HTMLDivElement).innerText
                .replace(/[€\s]/g, "")
                .replace(",", ".")
            )) || "0";
        } catch {
          console.log("no minimumPrice");
        }
        //console.log("minimumPrice", minimumPrice);

        const endsAtText = await auctionPage.$eval(
          ".h5.text-color-online",
          (el) =>
            (el as HTMLDivElement).innerText.substring(
              (el as HTMLDivElement).innerText.indexOf(" em ") + 4
            )
        );
        //console.log("endsAtText", endsAtText);
        const endsAtDay = endsAtText
          .substring(0, endsAtText.indexOf(" "))
          .trim();
        const endsAtMonth = endsAtText
          .substring(
            endsAtText.indexOf("de ") + 3,
            endsAtText.indexOf("pelas ")
          )
          .trim();
        const endsAtYear = dayjs().year().toString();
        const endsAtHour = endsAtText
          .substring(endsAtText.indexOf("pelas ") + 6, endsAtText.indexOf("h"))
          .trim();
        const endsAtDate = dayjs(
          `${endsAtYear} ${endsAtMonth} ${endsAtDay} ${endsAtHour}`,
          "YYYY MMMM DD HH",
          "pt"
        ).toDate();

        house.push({
          houseId,
          images,
          title,
          description,
          area: area || 0,
          typology,
          houseType,
          district,
          county,
          parish,
          marketValue: marketValue ? new Prisma.Decimal(marketValue) : null,
          minimumPrice: minimumPrice ? new Prisma.Decimal(minimumPrice) : null,
          startingPrice: null,
          currentBid: currentBid ? new Prisma.Decimal(currentBid) : null,
          startsAt: null,
          endsAt: endsAtDate,
          website: "leilosoc",
          createdAt: new Date(),
          updatedAt: new Date(),
          addressLine1: addressLine as string,
          addressNumber,
          addressFloor: null,
          postcode,
          latitude,
          longitude,
          currentBidHistory: currentBid ? [new Prisma.Decimal(currentBid)] : [],
          url,
        });
        //console.log("House:", house);
      }

      await auctionPage.close();
    }
    await page.click(".mat-paginator-navigation-next");
    await page.waitForSelector("p.text.trunc-title a");
    currentResults += PER_PAGE;
    console.log("currentResults", currentResults);
  }
  try {
    await prisma.house.createMany({
      data: house,
      skipDuplicates: true,
    });
    console.log("\nHouses Added:", house.length);
    console.log("\nHouses Updated:", housesUpdated);
  } catch (err) {
    console.log("Error Saving Houses:", err);
  }

  console.log("Leilosoc Bot Finished successfully.");
  await browser.close();
};
