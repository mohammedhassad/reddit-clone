import React from "react";
import { Box, Button, Flex, Icon, Text, Image, Avatar } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "@/store/communitiesStore";
import useCommunityData from "@/hooks/useCommunityData";
import { RedditCommunityFillIcon } from "@/styles/icons";

type Props = {
  communityData: Community;
  maxWidth?: string;
};

const Header: React.FC<Props> = ({ communityData, maxWidth }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth={maxWidth || "860px"}>
          {communityStateValue.currentCommunity.imageURL ? (
            <Image
              borderRadius="full"
              bgColor="#fff"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            // <Icon
            //   as={FaReddit}
            //   fontSize={64}
            //   position="relative"
            //   top={-3}
            //   color="blue.500"
            //   border="4px solid white"
            //   borderRadius="50%"
            // />
            <RedditCommunityFillIcon
              width="72px"
              height="72px"
              color="blue.500"
              mt="-14px"
              bgColor="#fff"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="26px">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="14px" color="gray.500">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
