import styled from "@emotion/styled";
import React from "react";
import Image from "./Image";
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 10px;
  gap: 0 10px;
`;
export default function Images({ images, children }) {
  const renderImages = () =>
    images?.map((img, i) => {
      return <Image key={img.data.id} i={i} image={img.data} />;
    });

  return <Grid>{renderImages()}</Grid>;
}
