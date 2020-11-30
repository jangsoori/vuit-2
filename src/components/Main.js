import styled from "@emotion/styled";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

import SortFilters from "./SortFilters";
import {
  useInfiniteQuery,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import InfiniteScroll from "react-infinite-scroll-component";
import Axios from "axios";
import { SearchContext } from "../contexts/SearchContext";
import Loading from "./Loading";

const MainWrapper = styled.section`
  /* height: 200vh; */
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Subreddit = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
`;

export default function Main() {
  const [subreddit, setSubreddit] = useState("");
  const [next, setNext] = useState("");
  const { input, sort, periodForTop } = useContext(SearchContext);
  //GET INITIAL DATA FUNCTION
  const queryPosts = async (key, sort, input, periodForTop, nextId = "") => {
    const { data } = await Axios.get(
      `https://www.reddit.com/r/${input ? input : "earthporn"}/${sort}.json?${
        sort === "top" ? `t=${periodForTop}` : ""
      }&after=` + nextId
    );

    return {
      data: data,
      nextId: data.data.after,
    };
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    isLoading,
  } = useInfiniteQuery(
    ["infinite-posts", sort, input, periodForTop],
    queryPosts,
    {
      getFetchMore: ({ data, nextId }) => {
        return nextId;
      },
    }
  );

  const loadMoreButtonRef = React.useRef();
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
    enabled: canFetchMore,
  });

  return (
    <MainWrapper>
      <Header>
        <Subreddit>r/{subreddit}</Subreddit>
        <SortFilters />
      </Header>
      {isLoading && <Loading />}
      <Posts data={data && data} />
      <button
        ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        disabled={!canFetchMore || isFetchingMore}
      >
        {isFetchingMore
          ? "Loading more..."
          : canFetchMore
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </MainWrapper>
  );
}
