import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFECE5",
      100: "#FFDACC",
      200: "#FFB499",
      300: "#FF8F66",
      400: "#FF6933",
      500: "#FF4500",
      600: "#CC3600",
      700: "#992900",
      800: "#661B00",
      900: "#330E00",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});

export default theme;
