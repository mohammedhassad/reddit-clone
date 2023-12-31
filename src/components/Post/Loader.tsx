import React from "react";
import {
  Stack,
  Box,
  SkeletonText,
  Skeleton,
  Flex,
  SkeletonCircle,
} from "@chakra-ui/react";

const PostLoader: React.FC = () => {
  return (
    <Stack spacing={6}>
      {[0, 1, 2, 3].map((item) => (
        <Flex
          key={item}
          border="1px solid"
          bg="white"
          borderColor="gray.300"
          borderRadius={4}
        >
          <Stack
            direction="column"
            align="center"
            bg="gray.50"
            p={2}
            width="40px"
            borderRadius="3px 0px 0px 3px"
          />
          <Flex width="100%">
            <Stack spacing={4} p="10px 10px" width="100%">
              <Stack direction="row" spacing={2} align="center">
                <SkeletonCircle boxSize="24px" />
                <SkeletonText noOfLines={1} width="30%" skeletonHeight="12px" />
                <SkeletonText noOfLines={1} width="20%" skeletonHeight="12px" />
              </Stack>
              <SkeletonText noOfLines={1} width="60%" skeletonHeight="18px" />
              <SkeletonText
                noOfLines={4}
                spacing="3"
                margin={2}
                skeletonHeight="12px"
              />
              <Flex justify="center" align="center" p={2}>
                <Skeleton height="200px" borderRadius={4} width="full" />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
};
export default PostLoader;
