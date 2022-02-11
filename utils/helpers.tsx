import { House } from "@prisma/client";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const ENV = process.env.NEXT_PUBLIC_ENV;
const API_PATH = ENV === "development" ? "/api" : "/.netlify/functions";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    throw error;
  }
  return res.json();
};
