import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
const AppWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
const queryCache = new QueryCache();

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Main />
      </ReactQueryCacheProvider>
    </AppWrapper>
  );
}
