import { House } from "@prisma/client";

const ENDPOINT =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3000"
    : "https://silly-engelbart-1bbd3b.netlify.app";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    throw error;
  }
  return res.json();
};

export const getHouse = async (houseId: string): Promise<House> => {
  const house = await fetch(`${ENDPOINT}/api/houses?id=${houseId}`).then(
    (res) => res.json()
  );
  return house;
};

export const prefetchHouses = async (): Promise<House[]> => {
  const houses: House[] = await fetch(`${ENDPOINT}/api/houses`).then((res) =>
    res.json()
  );
  return houses;
};

export const housesCount = async (query: {
  [key: string]: string;
}): Promise<number> => {
  const queryString = new URLSearchParams(query);
  queryString.append("count", "true");
  const count = await fetch(`${ENDPOINT}/api/houses?${queryString}`).then(
    (res) => res.json()
  );
  return count;
};
