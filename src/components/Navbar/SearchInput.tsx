import { RedditSearchIcon } from "@/styles/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type Props = {
  user: User;
};

const SearchInput: React.FC<Props> = ({ user }) => {
  return (
    <Flex alignItems="center" flexGrow={1} maxWidth={user ? "auto" : "600px"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.500">
          {/* <HiMagnifyingGlass size="1.25em" /> */}
          <RedditSearchIcon boxSize="20px" fontSize="20px" lineHeight="20px" />
        </InputLeftElement>
        <Input
          focusBorderColor="blue.500"
          placeholder="Search Reddit..."
          bg="gray.50"
          rounded="full"
          height="10"
          lineHeight="10"
          borderColor="gray.200"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            borderColor: "blue.500",
          }}
          _focusVisible={{
            boxShadow: "none",
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
