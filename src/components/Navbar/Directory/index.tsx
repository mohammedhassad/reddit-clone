import useDirectory from "@/hooks/useDirectory";
import { RedditCaretDownIcon } from "@/styles/icons";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import Communities from "./Communities";

type Props = {};

const Directory: React.FC<Props> = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen} onClose={toggleMenuOpen}>
      <>
        <MenuButton
          cursor="pointer"
          padding="0px 6px"
          borderRadius="4px"
          border="1px solid"
          borderColor="transparent"
          minHeight="40px"
          width={{
            base: "auto",
            lg: "270px",
          }}
          _hover={{ borderColor: "gray.200" }}
          onClick={toggleMenuOpen}
        >
          <Flex alignItems="center">
            <Flex alignItems="center" textAlign="start" flexGrow={1}>
              <>
                {directoryState.selectedMenuItem.imageURL ? (
                  <Image
                    borderRadius="full"
                    boxSize="24px"
                    src={directoryState.selectedMenuItem.imageURL}
                    mr={2}
                    alt={directoryState.selectedMenuItem.displayText}
                  />
                ) : (
                  <Box
                    boxSize="20px"
                    fontSize="20px"
                    lineHeight="20px"
                    mr={{ base: 1, md: 2 }}
                    color={directoryState.selectedMenuItem.iconColor}
                    as={directoryState.selectedMenuItem.icon}
                  />
                )}
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="14px"
                >
                  <Text fontWeight={600}>
                    {directoryState.selectedMenuItem.displayText}
                  </Text>
                </Box>
              </>
            </Flex>
            {/* <ChevronDownIcon color="gray.500" /> */}
            <RedditCaretDownIcon
              boxSize="20px"
              fontSize="20px"
              lineHeight="20px"
              color="gray.500"
            />
          </Flex>
        </MenuButton>
        <MenuList
          maxHeight="300px"
          overflow="auto"
          overflowX="hidden"
          width={{
            base: "72px",
            lg: "270px",
          }}
        >
          <Communities />
        </MenuList>
      </>
    </Menu>
  );
};

export default Directory;
