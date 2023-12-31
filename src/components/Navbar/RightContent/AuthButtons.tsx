import useAuthModalStore from "@/store/authModalStore";
import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AuthButtons: React.FC<Props> = () => {
  const setModalState = useAuthModalStore((state) => state.setModalState);

  return (
    <>
      <Button
        colorScheme="brand"
        variant="outline"
        height={34}
        display={{ base: "hidden", sm: "flex" }}
        width={{ base: "80px", md: "120px" }}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        colorScheme="brand"
        height={34}
        display={{ base: "hidden", sm: "flex" }}
        width={{ base: "80px", md: "120px" }}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
