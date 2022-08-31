import { parseISO } from "date-fns";
import React, { useState } from "react";
import useSWRImmutable from "swr";
import { Box, Select, Stack } from "@chakra-ui/react";

import VideoCard from "./video-card";
import ErrorToast from "./error-toast";
import ResultSkeleton from "./result-skeleton";
import ResultGrid from "./result-grid";

const sorters = {
  sortNewest: (a, b) =>
    parseISO(b[1].publishedAt).valueOf() - parseISO(a[1].publishedAt).valueOf(),
  sortOldest: (a, b) =>
    parseISO(a[1].publishedAt).valueOf() - parseISO(b[1].publishedAt).valueOf(),
  highestRating: (a, b) => b[1].likeCount - a[1].likeCount,
  lowestRating: (a, b) => a[1].likeCount - b[1].likeCount,
  mostRelevant: (a, b) => b[1].relevance - a[1].relevance,
  leastRelevant: (a, b) => a[1].relevance - b[1].relevance,
};

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while searching Youtube.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function SearchResults({ searchRequest, maxResults }) {
  const [sortBy, setSortBy] = useState("leastRelevant");
  const { data, error } = useSWRImmutable(
    searchRequest
      ? "/api/search?q=" + searchRequest + "&maxResults=" + maxResults
      : null,
    fetcher
  );

  if (error) {
    return <ErrorToast />;
  }
  if (!data && !searchRequest) {
    return <></>;
  }
  if (!data) {
    return <ResultSkeleton maxResults={maxResults} />;
  }

  return (
    <Stack m={5}>
      <Box>
        <Select
          float="right"
          w="10em"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="sortNewest">Newest</option>
          <option value="sortOldest">Oldest</option>
          <option value="highestRating">Highest Rated</option>
          <option value="lowestRating">Lowest Rated</option>
          <option value="mostRelevant">Most Relevant</option>
          <option value="leastRelevant">Least Relevant</option>
        </Select>
      </Box>
      <ResultGrid>
        {Object.entries(data)
          .sort(sorters[sortBy])
          .map(([k, v]) => (
            <VideoCard id={k} key={k} loaded={true} videoId={k} videoData={v} />
          ))}
      </ResultGrid>
    </Stack>
  );
}

SearchResults.defaultProps = {
  maxResults: 30,
};

export default SearchResults;
