import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
const Filters = styled.ul`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
`;
const Filter = styled.li`
  padding: 0.25rem 0.5rem;
  background: #888;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background: white;
      color: black;
    `}
`;
export default function SortFilters() {
  const { setSort, sort } = useContext(SearchContext);
  const filters = ["hot", "top", "new", "rising"];
  const renderFilters = () => {
    return filters.map((filter, i) => (
      <Filter
        key={Math.random()}
        selected={sort === filter}
        onClick={() => {
          setSort(filter);
        }}
      >
        {filter}
      </Filter>
    ));
  };
  return <Filters>{renderFilters()}</Filters>;
}
