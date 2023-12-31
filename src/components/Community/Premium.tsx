import React, { memo } from "react";
import { Flex, Icon, Text, Stack, Button } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";
import { RedditPremiumFillIcon } from "@/styles/icons";

const Premium: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        {/* <Icon as={GiCheckedShield} fontSize={26} color="brand.500" mt={2} /> */}
        <RedditPremiumFillIcon
          fontSize="26px"
          width="26px"
          height="26px"
          color="brand.500"
          mt={2}
        />
        <Stack spacing={1} fontSize="12px" pl={2}>
          <Text fontWeight={600}>Reddit Premium</Text>
          <Text>The best Reddit experience, with monthly Coins</Text>
        </Stack>
      </Flex>
      <Button colorScheme="brand" height="32px">
        Try Now
      </Button>
    </Flex>
  );
};

export default Premium;
