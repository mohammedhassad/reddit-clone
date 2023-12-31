import { auth } from "@/firebase/clientApp";
import { Flex, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import { User } from "firebase/auth";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/store/directoryMenuStore";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const [user] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <HStack
      display="flex"
      alignItems="center"
      py="2"
      px="5"
      bgColor="white"
      height="12"
      justifyContent={{ md: "space-between" }}
      spacing={1.5}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image
          src="/images/redditFace.svg"
          height="30px"
          alt="Reddit Face Logo"
        />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
          alt="Reddit Text Logo"
        />
      </Flex>

      {user && <Directory />}
      <SearchInput user={user as User} />
      <RightContent user={user as User} />
    </HStack>
  );
};

export default Navbar;
