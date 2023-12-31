import useDirectory from "@/hooks/useDirectory";
import {
  ComponentWithAs,
  Flex,
  Icon,
  IconProps,
  Image,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";

type DirectoryItemProps = {
  displayText: string;
  link: string;
  icon: ComponentWithAs<"svg", IconProps>;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<DirectoryItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="14px"
      height="40px"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex alignItems="center">
        {imageURL ? (
          <Image
            borderRadius="full"
            boxSize="18px"
            src={imageURL}
            mr={2}
            alt=""
          />
        ) : (
          <Icon
            boxSize="20px"
            fontSize="20px"
            lineHeight="20px"
            mr={2}
            as={icon}
            color={iconColor}
          />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
