import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Sorry, that community does not exist or has been banned
      <Link href="/">
        <Button
          colorScheme="blue"
          height="40px"
          lineHeight="40px"
          mt={4}
          rounded="full"
        >
          GO HOME
        </Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
