import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
const SearchWrapper = styled.section`
  display: flex;
  height: 100%;
`;
const Icon = styled.i`
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  align-self: center;
`;

const Form = styled.form`
  display: flex;
  line-height: 1;
`;
const Label = styled.label`
  background: #888;
  color: white;
  padding: 1rem 2rem;
  padding-right: 0;
  border-radius: 0.5rem 0 0 0.5rem;
  color: white;
  font-family: inherit;
  font-size: 2rem;
`;
const Input = styled.input`
  height: 100%;
  display: block;
  align-self: stretch;
  background: #888;
  border: none;
  padding: 1rem 2rem;
  padding-left: 0;
  border-radius: 0 0.5rem 0.5rem 0;
  color: white;
  font-family: inherit;
  font-size: 2rem;
`;
export default function Search() {
  const { input, setInput, setSort } = useContext(SearchContext);
  const [query, setQuery] = useState("");

  return (
    <SearchWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setInput(query);
          setSort("hot");
        }}
      >
        <Label>r/</Label>
        <Input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="subreddit"
        />
      </Form>
      <Icon
        className="fas fa-search fa-2x"
        onClick={() => {
          setInput(query);
        }}
      />
    </SearchWrapper>
  );
}
