import { useState, createContext } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("hot");

  return (
    <SearchContext.Provider value={{ input, setInput, sort, setSort }}>
      {children}
    </SearchContext.Provider>
  );
}
