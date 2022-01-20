import { Avatar, Box, Code, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Comment = ({ comment }) => {
  const date = new Date(comment.created_at);

  return (
    <HStack alignItems={"flex-start"} w={"100%"}>
      <Avatar
        name={comment.user.login}
        src={comment.user.avatar_url}
        size={"sm"}
      />
      <VStack
        border={"1px solid"}
        borderColor={"border.color"}
        rounded={"md"}
        color={"white"}
        w={"100%"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        overflow={"auto"}
      >
        <Box background={"bg.button"} w={"100%"} p={"0.5rem"}>{`${
          comment.user.login
        } commneted at ${date.toLocaleDateString()}`}</Box>
        <Box p={"0.5rem"} w={"100%"}>
          <ReactMarkdown
            remarkPlugins={[gfm]}
            components={{
              code: ({ inline, node, ...props }) => {
                return (
                  <Code
                    background={"code"}
                    color={"white"}
                    {...props}
                    overflow={inline ? "visible" : "auto"}
                    p={inline ? "0 0.5rem" : "1rem"}
                    rounded={inline ? "md" : "lg"}
                    w={inline ? "auto" : "100%"}
                    my={inline ? "0" : "1rem"}
                  />
                );
              },
            }}
          >
            {comment.body}
          </ReactMarkdown>
        </Box>
      </VStack>
    </HStack>
  );
};
export default Comment;
