import { create } from "zustand";
import { RedditHomeFillIcon } from "@/styles/icons";
import { IconProps } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/react";

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: ComponentWithAs<"svg", IconProps>;
  iconColor: string;
  imageURL?: string;
};

interface DirectoryMenuState {
  directoryState: {
    isOpen: boolean;
    selectedMenuItem: DirectoryMenuItem;
  };
  toggleMenuOpen: () => void;
  setSelectedMenuItem: (args: DirectoryMenuItem) => void;
}

export const defaultMenuItem = {
  displayText: "Home",
  link: "/",
  icon: RedditHomeFillIcon,
  iconColor: "black",
};

const useDirectoryMenuStore = create<DirectoryMenuState>((set) => ({
  directoryState: {
    isOpen: false,
    selectedMenuItem: defaultMenuItem,
  },
  toggleMenuOpen: () =>
    set((state) => ({
      directoryState: {
        ...state.directoryState,
        isOpen: !state.directoryState.isOpen,
      },
    })),
  setSelectedMenuItem: (args) =>
    set((state) => ({
      directoryState: {
        ...state.directoryState,
        selectedMenuItem: args,
      },
    })),
}));

export default useDirectoryMenuStore;
