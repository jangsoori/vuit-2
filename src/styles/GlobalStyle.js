import { css, Global } from "@emotion/react";
import React from "react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: inherit;
        }

        html {
          font-size: 62.5%;
          line-height: 1.2;
          font-family: "Quicksand";
        }
        html,
        body,
        #__next {
          height: 100%;
        }
        body {
          background: #222;
        }
      `}
    />
  );
}
