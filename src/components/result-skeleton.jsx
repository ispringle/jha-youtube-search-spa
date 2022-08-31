import React from "react";
import { Skeleton } from "@chakra-ui/react";
import ResultGrid from "./result-grid";
import VideoCard from "./video-card";

export default function ResultSkeleton({ maxResults }) {
  return (
    <ResultGrid>
      {Array.from(Array(maxResults)).map(() => (
        <Skeleton key="">
          <VideoCard loaded={false} />
        </Skeleton>
      ))}
    </ResultGrid>
  );
}
