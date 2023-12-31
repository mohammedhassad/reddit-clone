import { Post } from "@/store/postStore";
import {
  RedditCommentIcon,
  RedditCommunityFillIcon,
  RedditDeleteIcon,
  RedditDownvoteFillIcon,
  RedditDownvoteIcon,
  RedditSahreIcon,
  RedditSaveIcon,
  RedditUpvoteFillIcon,
  RedditUpvoteIcon,
} from "@/styles/icons";
import {
  Box,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";

type Props = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<Props> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostView = !onSelectPost;

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error("Failed to delete post");

      console.log("Post successfully deleted");

      //   if (router) router.back();
    } catch (error: any) {
      console.log("Error deleting post", error.message);

      setLoadingDelete(false);
      // setError
    }
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
      cursor={singlePostView ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      onClick={() => onSelectPost && post && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? "none" : "gray.50"}
        p={2}
        width="40px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        {/* <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.500" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, post, 1, post.communityId)}
        /> */}
        <Box
          as={userVoteValue === 1 ? RedditUpvoteFillIcon : RedditUpvoteIcon}
          color={userVoteValue === 1 ? "brand.500" : "gray.400"}
          boxSize="20px"
          fontSize="20px"
          lineHeight="20px"
          cursor="pointer"
          onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) =>
            onVote(event, post, 1, post.communityId)
          }
        />

        <Text fontSize="12px" fontWeight={600}>
          {post.voteStatus}
        </Text>

        <Box
          as={
            userVoteValue === -1 ? RedditDownvoteFillIcon : RedditDownvoteIcon
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          boxSize="20px"
          fontSize="20px"
          lineHeight="20px"
          cursor="pointer"
          onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) =>
            onVote(event, post, -1, post.communityId)
          }
        />
        {/* <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, post, -1, post.communityId)}
        /> */}
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          {post.createdAt && (
            <Stack direction="row" spacing={0.6} align="center" fontSize="12px">
              {homePage && (
                <>
                  {post.communityImageURL ? (
                    <Image
                      alt=""
                      borderRadius="full"
                      boxSize="20px"
                      src={post.communityImageURL}
                      mr={2}
                    />
                  ) : (
                    <Icon
                      as={RedditCommunityFillIcon}
                      fontSize={20}
                      mr={1}
                      color="blue.500"
                    />
                  )}
                  <Link href={`r/${post.communityId}`}>
                    <Text
                      fontWeight={700}
                      _hover={{ textDecoration: "underline" }}
                      onClick={(event) => event.stopPropagation()}
                    >{`r/${post.communityId}`}</Text>
                  </Link>
                  <Icon as={BsDot} color="gray.500" fontSize={8} />
                </>
              )}
              <Text color="gray.500">
                Posted by u/{post.userDisplayText}{" "}
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>
          )}
          <Text fontSize="18px" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="14px">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            {/* <Icon as={BsChat} mr={2} /> */}
            <RedditCommentIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
              mr={2}
            />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            {/* <Icon as={IoArrowRedoOutline} mr={2} /> */}
            <RedditSahreIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
              mr={2}
            />
            <Text fontSize="12px">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            {/* <Icon as={IoBookmarkOutline} mr={2} /> */}
            <RedditSaveIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
              mr={2}
            />
            <Text fontSize="12px">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  {/* <Icon as={AiOutlineDelete} mr={2} /> */}
                  <RedditDeleteIcon
                    boxSize="20px"
                    fontSize="20px"
                    lineHeight="20px"
                    mr={2}
                  />
                  <Text fontSize="12px">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
