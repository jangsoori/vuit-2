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
export default function Posts({ data }) {
  const renderPosts = () => {
    return data?.map((page, i) => {
      return (
        <React.Fragment key={i}>
          {page?.data.data.children.map((post) => {
            return <Post key={post.data.id} post={post.data} />;
          })}
        </React.Fragment>
      );
    });
  };

  return <Grid>{renderPosts()}</Grid>;
}
