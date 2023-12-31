import About from "@/components/Community/About";
import PageContentLayout from "@/components/Layout/PageContent";
import Comments from "@/components/Post/Comments";
import PostItem from "@/components/Post/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/store/postStore.js";
import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const PostPage: NextPage<Props> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onDeletePost } =
    usePosts();

  const fetchPost = async (pid: string) => {
    console.log("FETCHING POST");

    try {
      const postDocRef = doc(firestore, "posts", pid);
      const postDoc = await getDoc(postDocRef);

      setPostStateValue.setSelectedPost({
        id: postDoc.id,
        ...postDoc.data(),
      } as Post);
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
  };

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContentLayout maxWidth="950px">
      <>
        {postStateValue.selectedPost && (
          <>
            <PostItem
              post={postStateValue.selectedPost}
              userIsCreator={
                user?.uid === postStateValue.selectedPost.creatorId
              }
              userVoteValue={
                postStateValue.postVotes.find(
                  (item) => item.postId === postStateValue.selectedPost!.id
                )?.voteValue
              }
              onVote={onVote}
              onDeletePost={onDeletePost}
            />

            <Comments
              user={user}
              communityId={router.query.communityId as string}
              selectedPost={postStateValue.selectedPost as Post}
            />
          </>
        )}
      </>
      <>
        <About communityData={communityStateValue.currentCommunity} />
      </>
    </PageContentLayout>
  );
};

export default PostPage;
