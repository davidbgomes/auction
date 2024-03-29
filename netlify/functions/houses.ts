// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, House } from "@prisma/client";
import citiesList from "@/utils/data/cities.json";
import prisma from "../../lib/prisma";

const PER_PAGE = 16;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async (event: any, context: any) => {
  if (event.httpMethod === "GET") {
    try {
      const query = event.queryStringParameters;
      const houseId = query.id as string;
      if (houseId) {
        const house = await prisma.house.findUnique({
          where: {
            houseId,
          },
        });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(house),
        };
      } else {
        const districtValue = query.district as string;
        const countyValue = query.county as string;
        const parishValue = query.parish as string;

        const district = citiesList
          .find(
            ({ level, code }) => level === 1 && code === parseInt(districtValue)
          )
          ?.name.toLowerCase();
        const county = citiesList
          .find(
            ({ level, code }) => level === 2 && code === parseInt(countyValue)
          )
          ?.name.toLowerCase();
        const parish = citiesList
          .find(
            ({ level, code }) => level === 3 && code === parseInt(parishValue)
          )
          ?.name.toLowerCase();
        const minPrice = parseInt(query.minPrice as string);
        const maxPrice = parseInt(query.maxPrice as string);
        const minArea = parseInt(query.minArea as string);
        const maxArea = parseInt(query.maxArea as string);
        const houseType = (query.houseType as string)?.split(",");
        const typology = (query.typology as string)?.split(",");
        const sortBy = (query.orderBy as string)?.split("_");
        const count = query.count as string;
        const page = Number(query.page || 1);
        const skip = Math.abs((page - 1) * PER_PAGE);
        const defaultOrder: { [x: string]: "desc" | "asc" } = {
          website: "desc",
        };

        const where: Prisma.HouseWhereInput = {
          ...(district && { district: district }),
          ...(county && { county: county }),
          ...(parish && { parish: parish }),
          ...(minPrice && {
            currentBid: {
              gte: minPrice,
            },
          }),
          ...(maxPrice && {
            currentBid: {
              lte: maxPrice,
            },
          }),
          ...(minPrice &&
            maxPrice && {
              currentBid: {
                lte: maxPrice,
                gte: minPrice,
              },
            }),
          ...(minArea && {
            area: {
              gte: minArea,
            },
          }),
          ...(maxArea && {
            area: {
              lte: maxArea,
            },
          }),
          ...(minArea &&
            maxArea && {
              area: {
                lte: maxArea,
                gte: minArea,
              },
            }),
          ...(houseType && {
            houseType: {
              in: [...houseType],
            },
          }),
          ...(typology && {
            typology: {
              in: [...typology],
            },
          }),
        };
        // If Count is in the params, return only the search count
        if (count === "true") {
          const housesCount = await prisma.house.count({
            where,
          });
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(housesCount),
          };
        } else {
          const houses = await prisma.house.findMany({
            where,
            take: PER_PAGE,
            skip,
            ...(sortBy
              ? {
                  orderBy: {
                    [sortBy[0]]: sortBy[1],
                  },
                }
              : {
                  orderBy: defaultOrder,
                }),
          });
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(houses),
          };
        }
      }
    } catch (err) {
      console.log("error", err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Internal Server Error",
        }),
      };
    }
  }
};
