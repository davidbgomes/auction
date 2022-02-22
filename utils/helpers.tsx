const ENV = process.env.NEXT_PUBLIC_ENV;

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    throw error;
  }
  return res.json();
};

export const formatTitle = (title: string) => {
  const lowerCaseTitle = title.toLowerCase();
  return lowerCaseTitle.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
