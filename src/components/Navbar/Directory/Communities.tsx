import CreateCommunityModal from "@/components/Modal/CreateCommunity";
import useCommunitiesStore from "@/store/communitiesStore";
import { RedditAddIcon, RedditCommunityFillIcon } from "@/styles/icons";
import { Box, Flex, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import MenuListItem from "./MenuListItem";
import useCommunityData from "@/hooks/useCommunityData";

type Props = {};

const Communities: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  // const mySnippets = useCommunitiesStore(
  //   (state) => state.communityStateValue.mySnippets
  // );
  const {
    communityStateValue: { mySnippets },
  } = useCommunityData();

  return (
    <>
      <CreateCommunityModal isOpen={open} handleClose={() => setOpen(false)} />
      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={3} mb={4}>
          <Text pl={3} mb={1} fontSize="12px" fontWeight={600} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                imageURL={snippet.imageURL}
                icon={RedditCommunityFillIcon}
                iconColor="brand.500"
              />
            ))}
        </Box>
      )}

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="12px" fontWeight={600} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem width="100%" fontSize="14px" onClick={() => setOpen(true)}>
          <Flex alignItems="center">
            {/* <Icon fontSize={18} mr={2} as={GrAdd} /> */}
            <RedditAddIcon
              boxSize="18px"
              fontSize="18px"
              lineHeight="18px"
              mr={2}
            />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={RedditCommunityFillIcon}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
