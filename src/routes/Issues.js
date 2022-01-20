import { Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import Issue from "../components/Issue";
import { IssuesContext } from "../context/issues";

const Issues = () => {
  const { page, repo, issues, searchIssues, isLoading } = useContext(IssuesContext);

  const paginate = async (page) => {
    await searchIssues(repo.owner.login, repo.name, page);
  };

  if (isLoading)
    return (
      <Box mx={"auto"} my={"5rem"} textAlign={"center"}>
        <Spinner />
      </Box>
    );

  return (
    <Box maxW={"50rem"} mx={"auto"}>
      {repo && (
        <Text
          fontSize={"2rem"}
          my={"1rem"}
        >{`${repo.owner.login}/${repo.name}`}</Text>
      )}
      <VStack>
        {issues.length > 0 ? (
          issues.map((issue) => <Issue key={issue.id} issue={issue} />)
        ) : (
          <Box>Search for a repo!</Box>
        )}
      </VStack>
      {issues.length > 0 && (
        <HStack w={"100%"} my={"2rem"} justifyContent={"center"}>
          <Box
            w={"2rem"}
            _hover={{
              textDecor: "underline",
              cursor: "pointer",
            }}
            onClick={() => paginate(+page - 1)}
          >
            {page > 1 && "<"}
          </Box>
          <Box w={"2rem"}>{page}</Box>
          <Box
            w={"2rem"}
            _hover={{
              textDecor: "underline",
              cursor: "pointer",
            }}
            onClick={() => paginate(+page + 1)}
          >
            {page < Math.ceil(repo.open_issues / 30) && ">"}
          </Box>
        </HStack>
      )}
    </Box>
  );
};
export default Issues;
