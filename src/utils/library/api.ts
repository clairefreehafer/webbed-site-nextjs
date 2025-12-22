import { setEnvValue } from "..";

export const OPEN_LIBRARY_URL_BASE = "https://openlibrary.org";
const TVDB_URL_BASE = "https://api4.thetvdb.com/v4";

type OLBookResponse = {
  authors?: { key: string }[] | { author: { key: string } }[];
  covers: number[];
  full_title?: string;
  key: string;
  number_of_pages?: number;
  subtitle?: string;
  title?: string;
};

export const getBookData = async (olid: string): Promise<OLBookResponse> => {
  console.log(`🌐 [getBookData] fetching data for OLID "${olid}"...`);
  const response = await fetch(`${OPEN_LIBRARY_URL_BASE}/books/${olid}`, {
    headers: {
      accept: "application/json",
      "User-Agent": `ClairesWebbedSite/1.0 (${process.env.EMAIL_ADDRESS})`,
    },
  });
  return await response.json();
};

type OLAuthorResponse = {
  name: string;
};

export const getAuthorData = async (
  authorId: string
): Promise<OLAuthorResponse> => {
  console.log(
    `🌐 [getAuthorData] fetching data for author ID "${authorId}"...`
  );
  const response = await fetch(
    `${OPEN_LIBRARY_URL_BASE}/authors/${authorId}.json`,
    {
      headers: {
        accept: "application/json",
        "User-Agent": `ClairesWebbedSite/1.0 (${process.env.EMAIL_ADDRESS})`,
      },
    }
  );
  return await response.json();
};

export type TvdbLoginResponse =
  | {
      status: "failure";
      message: string;
    }
  | {
      status: "success";
      data: {
        token: string;
      };
    };

const loginToTvdb = async () => {
  const loginResponse = await fetch(`${TVDB_URL_BASE}/login`, {
    method: "POST",
    headers: {
      accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apikey: process.env.TVDB_API_KEY,
    }),
  });
  const loginResponseJson = (await loginResponse.json()) as TvdbLoginResponse;
  if (loginResponseJson.status === "failure") {
    throw new Error(
      `could not generate new TVDB JWT: ${loginResponseJson.message}`
    );
  }
  setEnvValue("TVDB_API_TOKEN", loginResponseJson.data.token);
  throw "successfully generated and set new TVDB JWT. please retry.";
};

type TvdbSeriesResponse =
  | {
      message: "Unauthorized";
    }
  | {
      status: "success";
      data: {
        name: string;
        image: string;
        slug: string;
      };
    };

export const getTvData = async (tvdbId: string) => {
  console.log(`🌐 [getTvData] fetching data for TVDB ID "${tvdbId}"...`);
  const seriesResponse = await fetch(`${TVDB_URL_BASE}/series/${tvdbId}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TVDB_API_TOKEN}`,
    },
  });
  const seriesResponseJson =
    (await seriesResponse.json()) as TvdbSeriesResponse;

  // if the JWT is expired, try generating it again.
  if (
    "message" in seriesResponseJson &&
    seriesResponseJson.message === "Unauthorized"
  ) {
    await loginToTvdb();
  }
  if (!("data" in seriesResponseJson)) {
    throw new Error(
      `unexpected issue grabbing series data: ${JSON.stringify(
        seriesResponseJson
      )}`
    );
  }
  return seriesResponseJson;
};
