import AuthModal from "@/components/Modal/Auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import { HStack } from "@chakra-ui/react";
import MenuWrapper from "./ProfileMenu/MenuWrapper";
import { User } from "firebase/auth";

type Props = {
  user: User;
};

const RightContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <HStack display="flex" alignItems="center" spacing={2}>
        {user ? <Icons /> : <AuthButtons />}
        <MenuWrapper />
      </HStack>
    </>
  );
};

export default RightContent;
