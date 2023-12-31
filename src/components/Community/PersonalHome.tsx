import React, { memo } from "react";
import { Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const PersonalHome: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
      width="312px"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/redditPersonalHome.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="0 12px 12px">
        <Flex align="center" mb={2}>
          {/* <Icon as={FaReddit} fontSize={50} color="brand.500" mr={2} /> */}
          <Image
            src="/images/snoo-home.png"
            alt="snoo home"
            width="40px"
            height="68px"
            objectFit="contain"
            mr={2}
          />
          <Text fontWeight={600} mt={30}>
            Home
          </Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="14px">
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </Text>
          <Button height="32px">Create Post</Button>
          <Button variant="outline" height="32px">
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;
