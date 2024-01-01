import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Community } from "@/store/communitiesStore";
import { RedditCommunityFillIcon } from "@/styles/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

type Props = {};

const Recommendations: React.FC<Props> = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      // console.log("HERE ARE COMS", communities);

      setCommunities(communities);
    } catch (error: any) {
      console.log("getCommunityRecommendations error", error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getCommunityRecommendations();
  }, [getCommunityRecommendations]);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/recCommsArt.png')"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack>
            {[0, 1, 2, 3, 4].map((item) => (
              <Flex
                key={item}
                align="center"
                position="relative"
                fontSize="14px"
                borderBottom="1px solid"
                borderColor="gray.200"
                p="10px 12px"
              >
                <Flex align="center" width="100%">
                  <Flex width="15%" />
                  <Flex align="center" width="85%">
                    <SkeletonCircle boxSize="28px" mr={2} />
                    <Skeleton height="10px" width="70%" />
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Flex
                  key={item.id}
                  position="relative"
                  align="center"
                  fontSize="14px"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="10px 12px"
                  fontWeight={600}
                >
                  <Flex align="center" width="80%">
                    <Flex width="15%">
                      <Text mr={2}>{index + 1}</Text>
                    </Flex>
                    <Flex align="center" width="80%">
                      <Link
                        href={`/r/${item.id}`}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {item.imageURL ? (
                          <Image
                            alt=""
                            borderRadius="full"
                            boxSize="28px"
                            src={item.imageURL}
                            mr={2}
                          />
                        ) : (
                          // <Icon
                          //   as={FaReddit}
                          //   fontSize={30}
                          //   color="brand.500"
                          //   mr={2}
                          // />
                          <RedditCommunityFillIcon
                            fontSize="28px"
                            width="28px"
                            height="28px"
                            color="brand.500"
                            mr={2}
                          />
                        )}
                        <Text
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          _hover={{ textDecoration: "underline" }}
                        >{`r/${item.id}`}</Text>
                      </Link>
                    </Flex>
                  </Flex>
                  <Box position="absolute" right="10px">
                    <Button
                      height="22px"
                      fontSize="8pt"
                      onClick={(event) => {
                        event.stopPropagation();
                        onJoinOrLeaveCommunity(item, isJoined);
                      }}
                      variant={isJoined ? "outline" : "solid"}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </Button>
                  </Box>
                </Flex>
              );
            })}
            <Box p="10px 20px">
              <Button height="32px" width="100%">
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
