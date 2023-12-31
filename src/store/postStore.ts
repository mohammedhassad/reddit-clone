import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type Post = {
  id?: string;
  communityId: string;
  communityImageURL?: string;
  userDisplayText: string;
  creatorId: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  currentUserVoteStatus?: {
    id: string;
    voteValue: number;
  };
  imageURL?: string;
  postIdx?: number;
  createdAt?: Timestamp;
  editedAt?: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

interface PostState {
  postStateValue: {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
  };
  setPosts: (args: Post[]) => void;
  setPostVotes: (args: PostVote[]) => void;
  setSelectedPost: (args: Post | null) => void;
}

const usePostStore = create<PostState>((set) => ({
  postStateValue: {
    selectedPost: null,
    posts: [],
    postVotes: [],
  },
  setPosts: (args) =>
    set((state) => ({
      postStateValue: { ...state.postStateValue, posts: args },
    })),

  setPostVotes: (args) =>
    set((state) => ({
      postStateValue: { ...state.postStateValue, postVotes: args },
    })),

  setSelectedPost: (args) =>
    set((state) => ({
      postStateValue: { ...state.postStateValue, selectedPost: args },
    })),
}));

export default usePostStore;
