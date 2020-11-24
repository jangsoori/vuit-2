import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
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
  const [selected, setSelected] = useState(0);

  const filters = ["hot", "top", "new", "rising"];
  const renderFilters = () => {
    return filters.map((filter, i) => (
      <Filter
        key={Math.random()}
        selected={selected === i}
        onClick={() => setSelected(i)}
      >
        {filter}
      </Filter>
    ));
  };
  return <Filters>{renderFilters()}</Filters>;
}
