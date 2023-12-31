import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import useAuthModalStore from "@/store/authModalStore";
import useCommunitiesStore, { Community } from "@/store/communitiesStore";
import {
  RedditCakeIcon,
  RedditCommunityFillIcon,
  RedditOverflowHorizontalIcon,
} from "@/styles/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  communityData: Community;
  pt?: number;
  onCreatePage?: boolean;
  loading?: boolean;
};

const About: React.FC<Props> = ({
  communityData,
  pt,
  onCreatePage,
  loading,
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, onSelectFile } = useSelectFile();
  const [imageLoading, setImageLoading] = useState(false);
  const setModalState = useAuthModalStore((state) => state.setModalState);
  const communityStateValue = useCommunitiesStore(
    (state) => state.communityStateValue
  );
  const setCurrentCommunity = useCommunitiesStore(
    (state) => state.setCurrentCommunity
  );

  const updateImage = async () => {
    if (!selectedFile) return;
    setImageLoading(true);

    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      console.log("HERE IS DOWNLOAD URL", downloadURL);

      setCurrentCommunity({
        ...communityStateValue.currentCommunity,
        imageURL: downloadURL,
      });
    } catch (err: any) {
      console.log("updateImage error", err.message);
    }

    setImageLoading(false);
  };

  const handleClick = () => {
    if (!user?.uid) {
      setModalState({ open: true, view: "login" });
      return;
    }

    router.push(`/r/${router.query.communityId}/submit`);
  };

  return (
    <Box pt={pt} position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.500"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="14px" fontWeight={700}>
          About Community
        </Text>
        {/* <Icon as={HiOutlineDotsHorizontal} cursor="pointer" /> */}
        <RedditOverflowHorizontalIcon
          fontSize="20px"
          width="20px"
          height="20px"
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {user?.uid === communityData?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="12px" fontWeight={700} color="blue.500">
                  Add description
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex width="100%" p={2} fontWeight={600} fontSize="14px">
                <Flex direction="column" flexGrow={1}>
                  <Text>
                    {communityData?.numberOfMembers?.toLocaleString()}
                  </Text>
                  <Text>Members</Text>
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Text>1</Text>
                  <Text>Online</Text>
                </Flex>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="14px"
              >
                {/* <Icon as={RiCakeLine} mr={2} fontSize={18} /> */}
                <RedditCakeIcon
                  fontSize="20px"
                  width="20px"
                  height="20px"
                  mr={2}
                />
                {communityData?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(
                      new Date(communityData.createdAt!.seconds * 1000)
                    ).format("MMM DD, YYYY")}
                  </Text>
                )}
              </Flex>
              {!onCreatePage && (
                <Button mt={3} height="32px" width="full" onClick={handleClick}>
                  Create Post
                </Button>
              )}
              {/* !!!ADDED AT THE VERY END!!! INITIALLY DOES NOT EXIST */}
              {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="14px" spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src={selectedFile || communityData?.imageURL}
                          alt="Dan Abramov"
                        />
                      ) : (
                        // <Icon
                        //   as={FaReddit}
                        //   fontSize={40}
                        //   color="brand.500"
                        //   mr={2}
                        // />
                        <RedditCommunityFillIcon
                          boxSize="40px"
                          fontSize="40px"
                          color="brand.500"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor="pointer" onClick={updateImage}>
                          Save Changes
                        </Text>
                      ))}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectFile}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default About;
