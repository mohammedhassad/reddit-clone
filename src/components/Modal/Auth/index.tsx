import { auth } from "@/firebase/clientApp";
import useAuthModalStore, { ModalView } from "@/store/authModalStore";
import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthInputs from "./Inputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type Props = {};

const AuthModal: React.FC<Props> = () => {
  const { modalState, setModalState } = useAuthModalStore((state) => state);
  const [user] = useAuthState(auth);

  const handleClose = useCallback(() => {
    setModalState({ open: false, view: modalState.view });
  }, [modalState.view, setModalState]);

  const toggleView = (view: ModalView) =>
    setModalState({ open: true, view: view });

  useEffect(() => {
    if (user) handleClose();
  }, [user, handleClose]);

  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" flexDirection="column" alignItems="center">
          {modalState.view === "login" && "Log In"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={6}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="90%"
          >
            {modalState.view === "login" || modalState.view === "signup" ? (
              <>
                <OAuthButtons />

                <Flex
                  position="relative"
                  width="80%"
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  my={6}
                >
                  <Divider />
                  <Text
                    position="absolute"
                    bg="white"
                    color="gray.500"
                    fontSize="12px"
                    fontWeight={700}
                    textAlign="center"
                    p={1}
                  >
                    OR
                  </Text>
                </Flex>

                <AuthInputs toggleView={toggleView} />
              </>
            ) : (
              <ResetPassword toggleView={toggleView} />
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
