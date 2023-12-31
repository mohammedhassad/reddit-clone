import { auth, firestore } from "@/firebase/clientApp";
import useAuthModalStore from "@/store/authModalStore";
import useCommunitiesStore, {
  Community,
  CommunitySnippet,
  defaultCommunity,
} from "@/store/communitiesStore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setModalState = useAuthModalStore((state) => state.setModalState);
  const { communityStateValue, setCommunitySnippets, setCurrentCommunity } =
    useCommunitiesStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
        isModerator: user?.uid === communityData.creatorId,
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id // will for sure have this value at this point
        ),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunitySnippets({
        mySnippets: [...communityStateValue.mySnippets, newSnippet],
        snippetsFetched: true,
      });
    } catch (error: any) {
      console.log("joinCommunity error", error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunitySnippets({
        mySnippets: communityStateValue.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
        snippetsFetched: true,
      });
    } catch (error: any) {
      console.log("leaveCommunity error", error.message);
    }
    setLoading(false);
  };

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user?.uid) {
      setModalState({ open: true, view: "login" });
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }

    joinCommunity(communityData);
  };

  const getMySnippets = useCallback(async () => {
    setLoading(true);
    try {
      const snippetsDoc = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetsDoc.docs.map((doc) => ({ ...doc.data() }));

      setCommunitySnippets({
        mySnippets: snippets as CommunitySnippet[],
        snippetsFetched: true,
      });
    } catch (err: any) {
      console.log("getMySnippets error", err.message);
    }
    setLoading(false);
  }, [setCommunitySnippets, user?.uid]);

  const getCommunityData = useCallback(
    async (communityId: string) => {
      // console.log("GETTING COMMUNITY DATA");

      try {
        const communityDocRef = doc(
          firestore,
          "communities",
          communityId as string
        );
        const communityDoc = await getDoc(communityDocRef);

        setCurrentCommunity({
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community);
      } catch (error: any) {
        console.log("getCommunityData error", error.message);
      }
    },
    [setCurrentCommunity]
  );

  useEffect(() => {
    if (!user) {
      setCommunitySnippets({ mySnippets: [], snippetsFetched: false });
      return;
    }

    // console.log("getMysnippets");
    getMySnippets();
  }, [user, getMySnippets, setCommunitySnippets]);

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId) {
      if (!communityStateValue.currentCommunity.id) {
        getCommunityData(communityId as string);
        return;
      }
      return;
    } else {
      setCurrentCommunity(defaultCommunity);
    }
  }, [
    router.query,
    communityStateValue.currentCommunity,
    getCommunityData,
    setCurrentCommunity,
  ]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
