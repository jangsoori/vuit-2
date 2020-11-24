import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Images from "./Images";
import SortFilters from "./SortFilters";

import InfiniteScroll from "react-infinite-scroll-component";
import Axios from "axios";
const MainWrapper = styled.section``;
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
  const [next, setNext] = useState("");
  useEffect(() => {
    const getItems = async () => {
      const { data } = await Axios.get(
        `https://www.reddit.com/r/earthporn/hot.json?limit=10`
      );
      const filtered = await data.data.children.filter((item) => {
        return item.data.post_hint === "image";
      });
      if (items.length === 0) {
        setItems(filtered);
      }
      setNext(data.data.after);
    };
    getItems();
  }, []);

  const fetchData = async (id) => {
    const { data } = await Axios.get(
      `https://www.reddit.com/r/earthporn/hot.json?limit=10&after=${id}`
    );
    const filtered = await data.data.children.filter((item) => {
      return item.data.post_hint === "image";
    });
    setItems(items.concat(filtered));
    setNext(data.data.after);
  };
  console.log(items);
  return (
    <>
      <MainWrapper>
        <Header>
          <Subreddit>r/placeholder</Subreddit>
          <SortFilters />
        </Header>

        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={items.length} //This is important field to render the next data
          next={() => fetchData(next)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Images images={items} />
        </InfiniteScroll>
      </MainWrapper>
    </>
  );
}
