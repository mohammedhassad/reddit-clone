import { auth, firestore } from "@/firebase/clientApp";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type Props = {};

const OAuthButtons: React.FC<Props> = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user?.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <VStack width="full" display="flex" direction="column" spacing={3}>
      <Button
        isLoading={loading}
        variant="oauth"
        width="full"
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="Google Logo"
          height="20px"
          mr={4}
        />
        <span>Continue with Google</span>
      </Button>
      <Button variant="oauth" width="full">
        <span>Some Other Provider</span>
      </Button>
      {error && (
        <Text textAlign="center" fontSize="14px" color="red" mt={2}>
          {error?.message}
        </Text>
      )}
    </VStack>
  );
};

export default OAuthButtons;
