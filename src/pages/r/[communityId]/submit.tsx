import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import PageContentLayout from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/PostForm/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import About from "@/components/Community/About";
import useCommunityData from "@/hooks/useCommunityData";

const CreateCommmunityPostPage: NextPage = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContentLayout maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue?.currentCommunity?.imageURL}
          />
        )}
      </>
      <>
        <About communityData={communityStateValue.currentCommunity} />
      </>
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
