import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import SearchProvider from "./contexts/SearchContext";
import GlobalStyle from "./styles/GlobalStyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <SearchProvider>
      <App />
    </SearchProvider>
  </>,

  document.getElementById("root")
);
