import { RedditDownvoteIcon, RedditUpvoteIcon } from "@/styles/icons";
import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { FaReddit } from "react-icons/fa";

export type Comment = {
  id?: string;
  creatorId: string;
  creatorDisplayText: string;
  creatorPhotoURL: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt?: Timestamp;
};

type Props = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  isLoading: boolean;
  userId?: string;
};

const CommentItem: React.FC<Props> = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} fontSize="10px">
          <Text
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayText}
          </Text>
          {comment.createdAt?.seconds && (
            <Text color="gray.600">
              {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          )}
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="14px">{comment.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          fontWeight={600}
          color="gray.500"
        >
          {/* <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} /> */}
          <RedditUpvoteIcon
            fontSize="20px"
            width="20px"
            height="20px"
            cursor="pointer"
            _hover={{
              color: "brand.500",
            }}
          />
          <Text fontSize="12px" mx={2}>
            Edit
          </Text>
          <RedditDownvoteIcon
            fontSize="20px"
            width="20px"
            height="20px"
            cursor="pointer"
            _hover={{
              color: "#4379FF",
            }}
          />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="12px" _hover={{ color: "blue.500" }} ml={2}>
                Edit
              </Text>
              <Text
                ml={2}
                fontSize="12px"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
