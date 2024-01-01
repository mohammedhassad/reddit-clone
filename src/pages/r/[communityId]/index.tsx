import About from "@/components/Community/About";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import CommunityNotFound from "@/components/Community/NotFound";
import PageContentLayout from "@/components/Layout/PageContent";
import Posts from "@/components/Post/Posts";
import { firestore } from "@/firebase/clientApp";
import useCommunitiesStore, { Community } from "@/store/communitiesStore";
import { doc, getDoc } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import safeJsonStringify from "safe-json-stringify";

type Props = {
  communityData: Community;
};

const CommunityPage: NextPage<Props> = ({ communityData }) => {
  const setCurrentCommunity = useCommunitiesStore(
    (state) => state.setCurrentCommunity
  );

  useEffect(() => {
    setCurrentCommunity(communityData);
  }, [communityData, setCurrentCommunity]);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData} maxWidth="950px" />
      <PageContentLayout maxWidth="950px">
        {/* Left Content */}
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>

        {/* Right Content */}
        <>
          <About communityData={communityData} />
        </>
      </PageContentLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error) {
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
  }
}

export default CommunityPage;
