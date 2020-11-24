import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  img {
    width: 300px;
  }
`;
const Meta = styled.section`
  background: #333;
  padding: 1rem;
  font-family: "Dosis";
  letter-spacing: normal;
`;
const Title = styled.p`
  color: white;
  font-size: 1.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Details = styled.section`
  font-size: 1.4rem;
  color: white;
  opacity: 0.5;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  column-gap: 1rem;
`;

const Detail = styled.p``;
export default function Image({ image, i }) {
  const [spans, setSpans] = useState("");
  const imageRef = useRef();
  const metaRef = useRef();

  const { url } = image.preview.images[0].resolutions[3] || "";

  const { author, created_utc } = image;
  //Get time of post creation converted from epoch time
  const time = dayjs.unix(created_utc)["$d"].toString();
  //use relativeTime plugin, necessary to work for .fromNow()
  dayjs.extend(relativeTime);
  //Calculate time since post creation
  const createdAgo = dayjs(time).fromNow();
  useEffect(() => {
    //This allows browser to get image height after it is loaded. It displayed as "0" before that, because it tried to get data when the image was not loaded.
    imageRef?.current?.addEventListener("load", () => {
      setSpans(
        Math.ceil(
          (imageRef?.current?.clientHeight + metaRef?.current?.clientHeight) /
            10 +
            1
        )
      );
    });
  }, [imageRef, metaRef]);
  return (
    <ImageWrapper className={i} style={{ gridRowEnd: `span ${spans}` }}>
      {url && (
        <img ref={imageRef} src={url.replaceAll("&amp;", "&")} alt="dsa" />
      )}

      <Meta ref={metaRef}>
        <Title>{image?.title}</Title>
        <Details>
          <Detail>created {createdAgo}</Detail>

          <Detail>u/{author}</Detail>
        </Details>
      </Meta>
    </ImageWrapper>
  );
}
