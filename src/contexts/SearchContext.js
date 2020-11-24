import { useState, createContext } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [input, setInput] = useState("");

  return (
    <SearchContext.Provider value={{ input, setInput }}>
      {children}
    </SearchContext.Provider>
  );
}
