import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const IssuesContext = React.createContext();

export function IssuesProvider(props) {
  let [searchParams, setSearchParams] = useSearchParams();

  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [issue, setIssue] = useState();
  const [repo, setRepo] = useState();
  const [page, setPage] = useState(1);

  const searchRepo = async (ow, rp) => {
    setIsLoading(true);
    const response = await fetch(`https://api.github.com/repos/${ow}/${rp}`);
    const data = await response.json();
    setRepo(data);
    setIsLoading(true);
  };

  const search = async (ow, rp, pg = 1) => {
    await searchRepo(ow, rp);
    await searchIssues(ow, rp, pg);
  };

  useEffect(() => {
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const pg = searchParams.get("page");
    if (owner && repo) {
      search(owner, repo, pg || 1);
    }
  }, []);

  const searchIssues = async (ow, rp, pg = 1) => {
    setIsLoading(true);
    setPage(pg);
    if (ow && rp) {
      setSearchParams({ owner: ow, repo: rp, page: pg });
      const response = await fetch(
        `https://api.github.com/repos/${ow}/${rp}/issues?page=${pg}`
      );
      const data = await response.json();
      setIssues(data);
    }
    setIsLoading(false);
  };

  const searchComments = async (own, rp, num) => {
    setIsLoading(true);
    if (!own || !rp || !num) return;

    const responses = await Promise.all([
      fetch(`https://api.github.com/repos/${own}/${rp}/issues/${num}`),
      fetch(`https://api.github.com/repos/${own}/${rp}/issues/${num}/comments`),
    ]);

    const datas = await Promise.all([responses[0].json(), responses[1].json()]);

    setIssue(datas[0]);
    setComments(datas[1]);
    setIsLoading(false);
  };

  return (
    <IssuesContext.Provider
      value={{
        page,
        repo,
        issue,
        issues,
        comments,
        isLoading,
        search,
        searchIssues,
        searchComments,
      }}
    >
      {props.children}
    </IssuesContext.Provider>
  );
}
