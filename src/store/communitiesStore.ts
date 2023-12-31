import { Timestamp } from "firebase/firestore";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restrictied" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  communityStateValue: {
    currentCommunity: Community;
    mySnippets: CommunitySnippet[];
    snippetsFetched: boolean;
  };
  setCommunitySnippets: (args: {
    mySnippets: CommunitySnippet[];
    snippetsFetched: boolean;
  }) => void;
  setCurrentCommunity: (args: Community) => void;
}

export const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
};

const useCommunitiesStore = create(
  devtools<CommunityState>((set) => ({
    communityStateValue: {
      currentCommunity: defaultCommunity,
      mySnippets: [],
      snippetsFetched: false,
    },
    setCommunitySnippets: (args) =>
      set((state) => ({
        communityStateValue: {
          ...state.communityStateValue,
          ...args,
        },
      })),
    setCurrentCommunity: (args) =>
      set((state) => ({
        communityStateValue: {
          ...state.communityStateValue,
          currentCommunity: args,
        },
      })),
  }))
);

export default useCommunitiesStore;
