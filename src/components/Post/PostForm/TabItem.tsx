import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { TabItemType } from "./NewPostForm";

type Props = {
  item: TabItemType;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};
const TabItem: React.FC<Props> = ({ item, selected, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Box
        as={selected ? item.selectedIcon : item.icon}
        fontSize="20px"
        width="20px"
        height="20px"
        mr={2}
      />
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
