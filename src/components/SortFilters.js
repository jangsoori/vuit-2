import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
const Filters = styled.section`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
`;
const Sort = styled.ul`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
`;
const SortText = styled.p`
  color: white;
  font-size: 1.6rem;
`;
const Period = styled.select``;
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
  const { setSort, sort, periodForTop, setPeriodForTop } = useContext(
    SearchContext
  );
  const [period, setPeriod] = useState("week");
  const filters = ["hot", "top", "new", "rising", "controversial"];
  console.log(period);
  console.log(periodForTop);
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
  useEffect(() => {
    setPeriodForTop(period);
    return () => {
      setPeriodForTop("week");
    };
  }, [period]);
  return (
    <Filters>
      <Sort>{renderFilters()}</Sort>
      {sort === "top" && (
        <>
          <SortText>Sort by</SortText>
          <Period onChange={(e) => setPeriod(e.target.value)} value={period}>
            <option value="hour">hour</option>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
            <option value="all">all</option>
          </Period>
        </>
      )}
    </Filters>
  );
}
