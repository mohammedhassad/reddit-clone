import { auth } from "@/firebase/clientApp";
import useAuthModalStore from "@/store/authModalStore";
import {
  RedditCaretDownIcon,
  RedditKarmaFillIcon,
  RedditLogoutIcon,
  RedditProfileIcon,
} from "@/styles/icons";
import {
  Box,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { VscAccount } from "react-icons/vsc";

type Props = {};

const MenuWrapper: React.FC<Props> = () => {
  const [user] = useAuthState(auth);
  const setModalState = useAuthModalStore((state) => state.setModalState);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        border="1px solid"
        borderColor="transparent"
        minHeight="40px"
        _hover={{ borderColor: "gray.200" }}
      >
        <Flex alignItems="center">
          {user ? (
            <Flex
              alignItems="center"
              textAlign="start"
              width={{
                base: "auto",
                lg: "175px",
              }}
            >
              {/* <Icon as={FaRedditSquare} fontSize={28} color="gray.300" mr={1} /> */}
              {/* <Image
                src="/images/profileicon_snoo.webp"
                boxSize="34px"
                mr={1}
                alt="profile icon"
              /> */}
              <Box mr={2} position="relative" boxSize="26px" flexBasis="26px">
                <Box boxSize="26px" borderRadius="50%" position="relative">
                  <Box boxSize="100%" rounded="full" bgColor="gray.200" />
                  <Box width="100%" position="absolute" bottom="0px">
                    <Image
                      src="/images/profileIcon_snoo.webp"
                      alt="profile icon"
                      width="100%"
                      display="block"
                      transform="scale(1.3)"
                      transformOrigin="bottom center"
                    />
                  </Box>
                </Box>
              </Box>

              <Box as="span" display={{ base: "none", lg: "block" }}>
                <Text
                  fontSize="13px"
                  fontWeight={600}
                  color="#1c1c1c"
                  whiteSpace="nowrap"
                >
                  {user?.displayName || user?.email?.split("@")[0]}
                </Text>
                <Flex
                  alignItems="center"
                  fontSize="12px"
                  fontWeight={600}
                  color="#a8aaab"
                >
                  {/* <Icon as={IoSparkles} color="brand.500" mr={1} /> */}
                  <RedditKarmaFillIcon color="brand.500" mr={1} />

                  <Text>1 karma</Text>
                </Flex>
              </Box>
            </Flex>
          ) : (
            <Icon as={VscAccount} fontSize={24} mr={1} color="gray.400" />
          )}

          {/* <ChevronDownIcon color="gray.500" /> */}
          <RedditCaretDownIcon
            boxSize="20px"
            fontSize="20px"
            lineHeight="20px"
            color="gray.500"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem fontSize="14px" fontWeight={600} height="40px">
              <Flex alignItems="center">
                {/* <Icon fontSize={20} mr={2} as={CgProfile} /> */}
                <RedditProfileIcon
                  boxSize="20px"
                  fontSize="20px"
                  lineHeight="20px"
                  mr={2}
                />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="14px"
              fontWeight={600}
              height="40px"
              onClick={logout}
            >
              <Flex alignItems="center">
                {/* <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> */}
                <RedditLogoutIcon
                  boxSize="20px"
                  fontSize="20px"
                  lineHeight="20px"
                  mr={2}
                />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="14px"
              fontWeight={600}
              height="40px"
              onClick={() => setModalState({ open: true, view: "login" })}
              // onClick={() => dispatch(openModal("login"))}
            >
              <Flex alignItems="center">
                {/* <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> */}
                <RedditLogoutIcon
                  boxSize="20px"
                  fontSize="20px"
                  lineHeight="20px"
                  mr={2}
                />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuWrapper;
