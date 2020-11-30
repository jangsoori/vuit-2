import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Post from "./Post";
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

  grid-auto-rows: 10px;
  gap: 0 10px;
  /* justify-items: flex-start; */
  width: 100%;
  height: 100%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;
export default function Posts({ data }) {
  const [cols, setCols] = useState(0);
  const { width } = useWindowSize();
  useEffect(() => {
    if (width < 400) {
      setCols(1);
    } else if (width < 700) {
      setCols(3);
    } else if (width < 900) {
      setCols(4);
    } else if (width < 1200) {
      setCols(5);
    } else if (width < 1800) {
      setCols(6);
    }
  }, [width]);

  // const
  const renderPosts = () => {
    return data?.map((page, i) => {
      return (
        <React.Fragment key={i}>
          {page?.data.data.children.map((post) => {
            return (
              <Post
                key={post.data.id}
                post={post.data}
                style={{ width: "100%", display: "block" }}
              />
            );
          })}
        </React.Fragment>
      );
    });
  };
  const renderCols = () => {
    return [...Array(cols)].map((e, i) => {
      return (
        <Col className={`column-${i + 1}`}>
          {data?.map((page, y) => {
            return (
              <React.Fragment key={y}>
                {page?.data.data.children.map((post) => {
                  console.log(y, i);
                  if (y % (1 + i) === 0) {
                    return (
                      <Post
                        key={post.data.id}
                        post={post.data}
                        style={{ width: "100%", display: "block" }}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </React.Fragment>
            );
          })}
        </Col>
      );
    });
  };

  return <Grid>{renderPosts()}</Grid>;
}
