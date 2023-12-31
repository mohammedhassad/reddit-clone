import useDirectory from "@/hooks/useDirectory";
import { RedditImagePostIcon, RedditLinkPostIcon } from "@/styles/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Icon,
  Image,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    const { communityId } = router.query;

    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    // Open directory menu to select community to post to
    toggleMenuOpen();
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      {/* <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} /> */}
      <Box mr={4} position="relative" boxSize="38px" flexBasis="38px">
        <Box boxSize="38px" borderRadius="50%" position="relative">
          <Box boxSize="100%" rounded="full" bgColor="gray.200" />
          <Box width="100%" position="absolute" bottom="0px">
            <Image
              src="/images/profileIcon_snoo.png"
              alt="profile icon"
              width="100%"
              display="block"
              transform="scale(1.3)"
              transformOrigin="bottom center"
            />
          </Box>
        </Box>
      </Box>

      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={handleClick}
      />
      {/* <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" /> */}
      <Box
        minH="40px"
        minW="40px"
        cursor="pointer"
        lineHeight="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={4}
        _hover={{
          bgColor: "gray.100",
        }}
      >
        <RedditImagePostIcon
          boxSize="20px"
          fontSize="20px"
          lineHeight="20px"
          color="gray.500"
        />
      </Box>

      <Box
        minH="40px"
        minW="40px"
        cursor="pointer"
        lineHeight="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={4}
        _hover={{
          bgColor: "gray.100",
        }}
      >
        <RedditLinkPostIcon
          boxSize="20px"
          fontSize="20px"
          lineHeight="20px"
          color="gray.500"
          cursor="pointer"
        />
      </Box>
    </Flex>
  );
};
export default CreatePostLink;
