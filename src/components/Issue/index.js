import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IssuesContext } from "../../context/issues";
import IconClosed from "../icons/IconClosed";
import IconComment from "../icons/IconComment";
import IconOpen from "../icons/IconOpen";

const Issue = ({ issue }) => {
  const { repo } = useContext(IssuesContext);

  const date = new Date(issue.created_at);
  return (
    <HStack
      border={"1px solid"}
      borderColor={"border.color"}
      p={"0.5rem"}
      rounded={"md"}
      color={"white"}
      w={"100%"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <Box>{issue.state === "open" ? <IconOpen /> : <IconClosed />}</Box>
      <Box w={"100%"}>
        <Link
          to={`issues?owner=${repo.owner.login}&repo=${repo.name}&issue=${issue.number}`}
        >
          <Text fontSize={"1rem"}>{issue.title}</Text>
        </Link>
        <Text fontSize={"0.8rem"} color={"subtext"}>{`#${
          issue.number
        } opened on ${date.toLocaleDateString()} by ${issue.user.login}`}</Text>
      </Box>
      {issue.comments && (
        <Box w={"3rem"}>
          <IconComment />
          {issue.comments}
        </Box>
      )}
    </HStack>
  );
};
export default Issue;
