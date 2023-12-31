import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { ModalView } from "@/store/authModalStore";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email("Invalid email address"),
  password: Yup.string().required().min(8, "Must be 8 characters minimum"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type Props = {
  toggleView: (view: ModalView) => void;
};

const SignUp: React.FC<Props> = ({ toggleView }) => {
  const [createUserWithEmailAndPassword, userCred, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  async function onSubmit(values: any) {
    createUserWithEmailAndPassword(values.email, values.password);
  }

  return (
    <Box as="form" width="full" onSubmit={formik.handleSubmit}>
      <Box mb={3}>
        <Input
          type="email"
          placeholder="Email"
          required
          bg="gray.50"
          fontSize="14px"
          height="44px"
          lineHeight="44px"
          border="2px solid"
          borderColor="gray.200"
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
          {...formik.getFieldProps("email")}
        />
      </Box>

      <Box mb={3}>
        <Input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          bg="gray.50"
          fontSize="14px"
          height="44px"
          lineHeight="44px"
          border="2px solid"
          borderColor="gray.200"
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
          {...formik.getFieldProps("password")}
        />
      </Box>

      <Box mb={3}>
        <Input
          type="password"
          placeholder="Confirm Password"
          required
          minLength={8}
          bg="gray.50"
          fontSize="14px"
          height="44px"
          lineHeight="44px"
          border="2px solid"
          borderColor="gray.200"
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
          {...formik.getFieldProps("confirmPassword")}
        />
      </Box>

      <Text textAlign="center" mt={2} color="red" fontSize="14px">
        {formik.errors["email"] ||
          formik.errors["password"] ||
          formik.errors["confirmPassword"] ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Box mt={2}>
        <Button
          isLoading={loading}
          colorScheme="brand"
          type="submit"
          width="full"
          height="44px"
        >
          Sign Up
        </Button>
      </Box>

      <Flex justifyContent="center" fontSize="13px" mt={4}>
        <Text mr={2}>Forgot your password?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight={700}
          onClick={() => toggleView("resetPassword")}
        >
          Reset
        </Text>
      </Flex>

      <Flex justifyContent="center" fontSize="13px" mt={4}>
        <Text mr={2}>Already Redditor?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight={700}
          onClick={() => toggleView("login")}
        >
          LOGIN
        </Text>
      </Flex>
    </Box>
  );
};

export default SignUp;
