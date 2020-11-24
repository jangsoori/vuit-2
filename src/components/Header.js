import styled from "@emotion/styled";
import React from "react";
import Search from "./Search";
const HeaderWrapper = styled.header`
  height: 4rem;
  /* background: #555; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;
const Logo = styled.h1`
  font-size: 2.4rem;
  color: white;
  cursor: pointer;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>vu.it</Logo>
      <Search />
    </HeaderWrapper>
  );
}
