import useCommunitiesStore from "@/store/communitiesStore";
import useDirectoryMenuStore, {
  DirectoryMenuItem,
  defaultMenuItem,
} from "@/store/directoryMenuStore";
import { RedditCommunityFillIcon } from "@/styles/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useDirectory = () => {
  const router = useRouter();
  const { directoryState, toggleMenuOpen, setSelectedMenuItem } =
    useDirectoryMenuStore((state) => state);
  const currentCommunity = useCommunitiesStore(
    (state) => state.communityStateValue.currentCommunity
  );

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setSelectedMenuItem(menuItem);

    router?.push(menuItem.link);
  };

  useEffect(() => {
    const existingCommunity = currentCommunity;

    if (existingCommunity.id) {
      setSelectedMenuItem({
        displayText: `r/${existingCommunity.id}`,
        link: `r/${existingCommunity.id}`,
        icon: RedditCommunityFillIcon,
        iconColor: "blue.500",
        imageURL: existingCommunity.imageURL,
      });
      return;
    }

    setSelectedMenuItem(defaultMenuItem);
  }, [currentCommunity]);

  return { directoryState, onSelectMenuItem, toggleMenuOpen };
};

export default useDirectory;
