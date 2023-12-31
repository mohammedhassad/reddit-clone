import { StyleFunctionProps } from "@chakra-ui/react";
import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    fontSize: "14px",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "12px",
    },
    md: {
      fontSize: "14px",
    },
  },
  variants: {
    solid: (props: StyleFunctionProps) => ({
      bg: `${props.colorScheme}.500`,
      _hover: {
        bg: `${props.colorScheme}.400`,
      },
    }),
    outline: (props: StyleFunctionProps) => ({
      color: `${props.colorScheme}.500`,
      borderColor: `${props.colorScheme}.500`,
      _hover: {
        bg: `${props.colorScheme}.50`,
      },
    }),
    oauth: {
      height: "44px",
      color: "#3c4043",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "blue.50",
        borderColor: "blue.100",
      },
    },
  },
  defaultProps: {
    colorScheme: "blue",
  },
};
