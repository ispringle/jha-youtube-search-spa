import { Box, Skeleton } from "@chakra-ui/react";
import ResultGrid from "./result-grid";
import VideoCard from "./video-card";

export default function ResultSkeleton({ maxResults }) {
  return (
    <ResultGrid>
      {Array.from(Array(maxResults)).map((_) => (
        <Skeleton>
          <VideoCard loaded={false} />
        </Skeleton>
      ))}
    </ResultGrid>
  );
}
