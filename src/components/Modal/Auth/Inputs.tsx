import useAuthModalStore, { ModalView } from "@/store/authModalStore";
import { Flex } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

type Props = {
  toggleView: (view: ModalView) => void;
};

const AuthInputs: React.FC<Props> = ({ toggleView }) => {
  const modalState = useAuthModalStore((state) => state.modalState);

  return (
    <Flex alignItems="center" direction="column" width="full">
      {modalState.view === "login" ? (
        <Login toggleView={toggleView} />
      ) : (
        <SignUp toggleView={toggleView} />
      )}
    </Flex>
  );
};

export default AuthInputs;
