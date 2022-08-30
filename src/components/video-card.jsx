import { Box, Image, Link, Skeleton, SkeletonText } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export default function VideoCard({ loaded, videoId, videoData }) {
  return (
    <Box
      h="315px"
      w="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Skeleton fadeDuration={1} isLoaded={loaded}>
        <Image
          h="187.5px"
          w="250px"
          src={videoData?.thumbnails.high.url}
          alt={videoData?.title}
        />
      </Skeleton>
      <Box p="4">
        <SkeletonText fadeDuration={1} isLoaded={loaded}>
          <Box fontWeight="bold" noOfLines={1}>
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href={"https://www.youtube.com/watch?v=" + videoId}
            >
              {videoData?.title}
            </Link>
          </Box>
        </SkeletonText>
        <SkeletonText fadeDuration={1} isLoaded={loaded}>
          <Box>
            <ChatIcon pr={1} />
            {videoData?.commentCount || "0"}
          </Box>
        </SkeletonText>
        <SkeletonText fadeDuration={1} isLoaded={loaded}>
          <Box noOfLines={2}> {videoData?.description} </Box>
        </SkeletonText>
      </Box>
    </Box>
  );
}
