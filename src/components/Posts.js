import styled from "@emotion/styled";
import React from "react";
import Post from "./Post";
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 10px;
  gap: 0 10px;
  justify-items: flex-start;
`;
export default function Posts({ posts }) {
  const renderPosts = () =>
    posts?.map((img, i) => {
      return <Post key={img.data.id} i={i} post={img.data} />;
    });

  return <Grid>{renderPosts()}</Grid>;
}
