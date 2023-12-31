import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { ModalView } from "@/store/authModalStore.js";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import * as Yup from "yup";

const initialValues = {
  email: "demo@example.com",
  password: "unsafepassword",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  password: Yup.string().min(8, "Must be 8 characters minimum"),
});

type Props = {
  toggleView: (view: ModalView) => void;
};

const Login: React.FC<Props> = ({ toggleView }) => {
  const [signInWithEmailAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  async function onSubmit(values: any) {
    signInWithEmailAndPassword(values.email, values.password);
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

      <Text textAlign="center" mt={2} color="red" fontSize="14px">
        {formik.errors["email"] ||
          formik.errors["password"] ||
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
          Log In
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
        <Text mr={2}>New here?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight={700}
          onClick={() => toggleView("signup")}
        >
          SIGN UP
        </Text>
      </Flex>
    </Box>
  );
};

export default Login;
