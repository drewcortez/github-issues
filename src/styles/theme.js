import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    white: "#f0f6fb",
    bg: {
      nav: "#161b21",
      button: "#23262c",
    },
    border: {
      color: "#383b41",
      hover: "#8e949d",
    },
    openIssue: "#3fb950",
    closedIssue: "#a371f7",
    subtext: "#8b949e",
    code: "#161b21",
  },
  styles: {
    global: {
      "html, body": {
        color: "#f0f6fb",
        backgroundColor: "#0c1116",
        lineHeight: "tall",
      },
      a: {
        color: "#79a3f9",
      },
    },
  },
});

export default theme;
