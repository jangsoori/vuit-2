import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import SortFilters from "./SortFilters";

import InfiniteScroll from "react-infinite-scroll-component";
import Axios from "axios";
import { SearchContext } from "../contexts/SearchContext";
import Loading from "./Loading";
const MainWrapper = styled.section`
  height: 100vh;
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
  const [items, setItems] = useState([]);
  const [subreddit, setSubreddit] = useState("");
  const [next, setNext] = useState("");
  const { input, sort } = useContext(SearchContext);
  //GET INITIAL DATA FUNCTION
  const getItems = async () => {
    const { data } = await Axios.get(
      `https://www.reddit.com/r/${input ? input : "earthporn"}/${sort}.json`
    );

    setItems(data.data.children);
    setNext(data.data.after);
    setSubreddit(data.data.children[0].data.subreddit);
  };
  console.log(items);
  useEffect(() => {
    getItems();

    return () => {
      setItems([]);
      setNext("");
    };
  }, [input, sort]);

  const fetchData = async (id) => {
    const { data } = await Axios.get(
      `https://www.reddit.com/r/${
        input ? input : "earthporn"
      }/${sort}.json?after=${id}`
    );
    const filtered = await data.data.children.filter((item) => {
      return item.data.post_hint === "image";
    });
    setItems(items.concat(filtered));
    setNext(data.data.after);
  };
  return (
    <MainWrapper>
      <Header>
        <Subreddit>r/{subreddit}</Subreddit>
        <SortFilters />
      </Header>
      {/* <Loading /> */}
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={items.length} //This is important field to render the next data
        next={() => fetchData(next)}
        hasMore={next === null ? false : true}
        loader={<Loading />}
        scrollThreshold={0.95}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Posts posts={items} />
      </InfiniteScroll>
    </MainWrapper>
  );
}
