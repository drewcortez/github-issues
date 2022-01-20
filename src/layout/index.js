import { Box } from "@chakra-ui/react";
import React from "react";
import SearchBar from "../components/SearchBar";

const Layout = (props) => (
  <>
    <SearchBar />
    <Box as={"main"}>{props.children}</Box>
  </>
);

export default Layout;
