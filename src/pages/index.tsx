import CreatePostLink from "@/components/Community/CreatePostLink";
import PersonalHome from "@/components/Community/PersonalHome";
import Premium from "@/components/Community/Premium";
import Recommendations from "@/components/Community/Recommendations";
import PageContentLayout from "@/components/Layout/PageContent";
import PostLoader from "@/components/Post/Loader";
import PostItem from "@/components/Post/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Post, PostVote } from "@/store/postStore.js";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const HomePage: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const getNoUserHomePosts = async () => {
    console.log("GETTING NO USER FEED");
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NO USER FEED", posts);

      setPostStateValue.setPosts(posts as Post[]);
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserHomePosts = async () => {
    console.log("GETTING USER FEED");
    setLoading(true);
    try {
      // User has joined communities
      if (communityStateValue.mySnippets.length) {
        console.log("GETTING POSTS IN USER COMMUNITIES");

        const myCommunityIds = communityStateValue?.mySnippets?.map(
          (snippet) => snippet.communityId
        );

        console.log(myCommunityIds);
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );

        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue.setPosts(posts as Post[]);
      }
      // User has not joined any communities yet
      else {
        getNoUserHomePosts();
      }
    } catch (error: any) {
      console.log("getUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    if (!postStateValue.posts.length) return;

    const postIds = postStateValue?.posts?.map((post) => post.id);
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("postId", "in", postIds)
    );

    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs?.docs.map((postVote) => ({
      id: postVote.id,
      ...postVote.data(),
    }));

    setPostStateValue.setPostVotes(postVotes as PostVote[]);
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) getUserHomePosts();
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user?.uid && !loadingUser) {
      getNoUserHomePosts();
    }
  }, [user?.uid, loadingUser]);

  useEffect(() => {
    if (!user?.uid && !postStateValue.posts.length) return;
    getUserPostVotes();

    return () => {
      setPostStateValue.setPostVotes([]);
    };
  }, [user?.uid, postStateValue.posts]);

  return (
    <PageContentLayout maxWidth="950px">
      <>
        {/* PostFeed */}
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5}>
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default HomePage;
