import { auth, firestore } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [nameError, setNameError] = useState("");
  const [communityType, setCommunityType] = useState("public");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateCommunity = async () => {
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(name) || name.length < 3) {
      return setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", name);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r${name} is taken. Try another.`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // create community snippets
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, name),
          {
            communityId: name,
            isModerator: true,
          }
        );
      });

      const communityName = name;
      setName("");
      handleClose();

      router.push(`/r/${communityName}`);
    } catch (err: any) {
      console.log("Transaction error", err);
      setNameError(err.message);
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent maxWidth="lg">
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a community
        </ModalHeader>
        <Box px={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0px">
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={12} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>

            <InputGroup mt={6}>
              <InputLeftElement height="full">
                <Text color="gray.400">r/</Text>
              </InputLeftElement>
              <Input
                bg="gray.50"
                fontSize="14px"
                name="name"
                height="44px"
                lineHeight="44px"
                border="2px solid"
                borderColor="gray.200"
                pl="1.6rem"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  borderColor: "blue.500",
                }}
                _focus={{
                  bg: "white",
                  borderColor: "blue.500",
                }}
                _focusVisible={{
                  borderColor: "blue.500",
                  boxShadow: "none",
                }}
                value={name}
                onChange={handleChange}
              />
            </InputGroup>
            <Text
              fontSize="13px"
              color={charsRemaining === 0 ? "red" : "gray.500"}
              pt={2}
            >
              {charsRemaining} Characters Remaining
            </Text>
            <Text fontSize="13px" color="red" pt={1}>
              {nameError}
            </Text>

            <Box my={5}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              <RadioGroup onChange={setCommunityType} value={communityType}>
                <Stack direction="column" spacing={2} pt={1}>
                  <Radio value="public">
                    <Flex alignItems="center">
                      <Icon fill="gray.500" viewBox="0 0 20 20" mr={2}>
                        <path d="M12,11 C15.309,11 18,13.691 18,17 C18,17.553 17.552,18 17,18 L3,18 C2.448,18 2,17.553 2,17 C2,13.691 4.691,11 8,11 L12,11 Z M10,9.7334 C7.868,9.7334 6.133,7.9994 6.133,5.8664 L6.133,4.8664 C6.133,2.7344 7.868,1.0004 10,1.0004 C12.132,1.0004 13.867,2.7344 13.867,4.8664 L13.867,5.8664 C13.867,7.9994 12.132,9.7334 10,9.7334 Z"></path>
                      </Icon>
                      <Text fontSize="14px" fontWeight={600} mr={1}>
                        Public
                      </Text>
                      <Text fontSize="12px" color="gray.500">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio value="restricted">
                    <Flex alignItems="center">
                      <Icon fill="gray.500" viewBox="0 0 40 40" mr={2}>
                        <g>
                          <path d="M20,8C9.1,8,0.5,14,0.5,21.7h4c0-3.6,3.4-6.9,8.2-8.5C11,15,10,17.4,10,20c0,5.5,4.5,10,10,10s10-4.5,10-10c0-2.6-1-5-2.7-6.8c4.8,1.7,8.2,4.9,8.2,8.5h4C39.5,14,30.9,8,20,8z"></path>
                        </g>
                      </Icon>
                      <Text fontSize="14px" fontWeight={600} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="12px" color="gray.500">
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio value="private">
                    <Flex alignItems="center">
                      <Icon fill="gray.500" viewBox="0 0 40 40" mr={2}>
                        <g>
                          <rect x="7.5" y="12.5" width="0" height="0"></rect>
                          <path
                            fill="inherit"
                            d="M32.5,17.5v-2.6c0-6.8-5.6-12.4-12.4-12.4h-0.2c-6.8,0-12.4,5.6-12.4,12.4v2.6C6.1,17.5,5,18.6,5,20v10c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V20C35,18.6,33.9,17.5,32.5,17.5z M12.5,17.5v-2.6c0-4.1,3.3-7.4,7.4-7.4h0.2c4.1,0,7.4,3.3,7.4,7.4v2.6H12.5z"
                          ></path>
                        </g>
                      </Icon>
                      <Text fontSize="14px" fontWeight={600} mr={1}>
                        Private
                      </Text>
                      <Text fontSize="12px" color="gray.500">
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </ModalBody>
        </Box>

        <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
          <Button
            colorScheme="blue"
            variant="outline"
            rounded="full"
            height="32px"
            mr={2}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            rounded="full"
            height="32px"
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
