import axios from "axios";

import mockApiData from "../../test/mock-api-data.js";

const BASE_URL =
  process.env.BASE_URL || "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.GOOGLE_API_KEY;

const priorSearches = {};

const getUri = async (uri) => {
  console.log("GET: " + uri);
  const res = await axios
    .get(uri)
    .then((r) => r)
    .catch((e) => {
      console.error(e);
      return e.response.data;
    });
  return res;
};

const buildUri = (params, endpoint) => {
  const paramString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return BASE_URL + "/" + endpoint + "?" + paramString;
};

const getMockData = async () => {
  let promise = new Promise((resolve) => setTimeout(() => resolve(), 2000));
  await promise;
  return mockApiData;
};

export default async function handler(req, res) {
  if (process.env.NODE_ENV == "development") {
    const data = await getMockData();
    console.log("using mock data");
    return res.status(200).json(data);
  }
  const searchParams = {
    ...req.query,
    ...{
      key: API_KEY,
    },
  };
  const searchUri = buildUri(searchParams, "search");
  if (Object.prototype.hasOwnProperty.call(priorSearches, searchUri)) {
    console.log("Returning cached results for " + searchUri);
    return res.status(200).json(priorSearches[searchUri]);
  } else {
    const searchResults = await getUri(searchUri);

    if (searchResults?.error) {
      return res.status(500).json(searchResults.error);
    }

    let videoIds = [];
    let relevanceValues = {};
    for (let i = 0; i < searchResults.data.items.length; i++) {
      const v = searchResults.data.items[i];
      const vId = v.id.videoId;
      videoIds.push(vId);
      relevanceValues[vId] = { relevance: i };
    }

    const videosDataUri = buildUri(
      {
        id: videoIds.join(","),
        key: API_KEY,
        part: "statistics,snippet",
      },
      "videos"
    );

    const videosData = await getUri(videosDataUri);

    const data = videosData.data.items.reduce(
      (acc, v) => ({
        ...acc,
        [v.id]: { ...relevanceValues[v.id], ...v.snippet, ...v.statistics },
      }),
      {}
    );

    // console.log(JSON.stringify(data));
    priorSearches[searchUri] = data;
    return res.status(200).json(data);
  }
}
