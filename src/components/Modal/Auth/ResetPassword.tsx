import { auth } from "@/firebase/clientApp";
import { ModalView } from "@/store/authModalStore";
import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsReddit } from "react-icons/bs";
import * as Yup from "yup";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email("Invalid email address"),
});

type Props = {
  toggleView: (view: ModalView) => void;
};

const ResetPassword: React.FC<Props> = ({ toggleView }) => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [success, setSuccess] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  async function onSubmit(values: any) {
    await sendPasswordResetEmail(values.email);
    setSuccess(true);
  }

  return (
    <Flex width="full" direction="column" alignItems="center">
      <Icon as={BsReddit} mb={2} color="brand.500" fontSize={40} />
      <Text mb={2} fontWeight={700}>
        Reset your password
      </Text>

      {success ? (
        <Text mb={4} textAlign="center">
          Check your email :)
        </Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <Box as="form" width="full" mt={4} onSubmit={formik.handleSubmit}>
            <Box mb={3}>
              <Input
                required
                placeholder="email"
                type="email"
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

            <Text textAlign="center" mt={2} color="red" fontSize="14px">
              {formik.errors["email"] || error?.message}
            </Text>

            <Box mt={2}>
              <Button
                isLoading={sending}
                colorScheme="brand"
                type="submit"
                width="full"
                height="44px"
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </>
      )}

      <Flex
        alignItems="center"
        fontSize="14px"
        fontWeight={700}
        color="blue.500"
        mt={4}
      >
        <Text cursor="pointer" onClick={() => toggleView("login")}>
          LOGIN
        </Text>

        <Icon as={BsDot} color="gray.900" />

        <Text cursor="pointer" onClick={() => toggleView("signup")}>
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
