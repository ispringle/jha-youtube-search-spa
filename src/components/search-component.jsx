import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import SearchForm from "./search-form";
import SearchResults from "./search-results";

export default function SearchComponent() {
  const [searchRequest, setSearchRequest] = useState("");
  const maxResults = 30;

  return (
    <Box>
      <SearchForm
        setSubmit={setSearchRequest}
        placeholder="Search for a video..."
      />
      <SearchResults maxResults={maxResults} searchRequest={searchRequest} />
    </Box>
  );
}
