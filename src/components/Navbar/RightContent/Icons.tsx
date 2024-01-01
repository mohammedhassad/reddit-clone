import {
  RedditAddIcon,
  RedditChatIcon,
  RedditCoinsIcon,
  RedditNotificationIcon,
  RedditPopularIcon,
} from "@/styles/icons";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Icons: React.FC<Props> = () => {
  return (
    <Flex alignItems="center" flexGrow={1}>
      <HStack
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
        spacing={1.5}
        pr={1.5}
      >
        <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={
            <RedditPopularIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
            />
          }
          // icon={<BsArrowUpRightCircle size={22} />}
        />
        <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={
            <RedditCoinsIcon boxSize="20px" fontSize="20px" lineHeight="20px" />
          }
          // icon={<IoFilterCircleOutline size={24} />}
        />
        {/* <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={<IoVideocamOutline size={24} />}
        /> */}
      </HStack>

      <HStack
        display="flex"
        alignItems="center"
        pl={{ base: 0, md: 1.5 }}
        spacing={1.5}
      >
        <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={
            <RedditChatIcon boxSize="20px" fontSize="20px" lineHeight="20px" />
          }
          // icon={<BsChatDots size={22} />}
        />
        <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={
            <RedditNotificationIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
            />
          }
          // icon={<IoNotificationsOutline size={22} />}
        />
        <IconButton
          colorScheme="gray"
          rounded="md"
          bg="transparent"
          _hover={{
            bg: "gray.100",
          }}
          aria-label=""
          icon={
            <RedditAddIcon boxSize="20px" fontSize="20px" lineHeight="20px" />
          }
          // icon={<GrAdd size={22} />}
        />
      </HStack>
    </Flex>
  );
};

export default Icons;
