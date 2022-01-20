import { Box, Code, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
import gfm from "remark-gfm";
import Comment from "../components/Comment";
import IconClosed from "../components/icons/IconClosed";
import IconOpen from "../components/icons/IconOpen";
import { IssuesContext } from "../context/issues";

const IssueDetails = () => {
  let [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { issue, comments, searchComments } = useContext(IssuesContext);

  const search = async () => {
    await searchComments(
      searchParams.get("owner"),
      searchParams.get("repo"),
      searchParams.get("issue")
    );
    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, []);

  if (isLoading)
    return (
      <Box mx={"auto"} my={"5rem"} textAlign={"center"}>
        <Spinner />
      </Box>
    );

  if (issue)
    return (
      <VStack maxW={"50rem"} mx={"auto"} mb={"5rem"}>
        <HStack w={"100%"} my={"1.5rem"} alignItems={"flex-start"}>
          {issue?.state === "open" ? <IconOpen /> : <IconClosed />}
          <Box w={"100%"}>
            <Text fontSize={"1rem"}>{issue?.title}</Text>
            <Text fontSize={"0.8rem"} color={"subtext"}>{`Opened by ${
              issue?.user.login
            } on ${new Date(issue?.created_at).toLocaleDateString()}`}</Text>
            <Box my={"1rem"}>
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
                {issue.body}
              </ReactMarkdown>
            </Box>
          </Box>
        </HStack>
        {comments.length === 0 ? (
          <Text m="5rem"> No comments</Text>
        ) : (
          <VStack>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </VStack>
        )}
      </VStack>
    );

  return <></>;
};
export default IssueDetails;
