import React from "react";
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  flex: 0 0 auto;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  background-color: #ccc;

  @media (max-width: 1280px) {
    width: calc((100vw - (5px * 12)) / 6);
    height: calc(((100vw - (5px * 12)) / 6) * 1.5);
  }

  @media (min-width: 1282px) {
    width: calc((100vw - (5px * 12)) / 6);
    height: calc(((100vw - (5px * 12)) / 6) * 1.5);
  }

  &:after {
    content: "";
    display: block;
    padding-top: 177.77%;
  }
`;

const SkeletonItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
`;

const SkeletonUI = ({ count = 6 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <SkeletonWrapper data-testid="skeleton" key={`skeleton-${index}`}>
        <SkeletonItem />
      </SkeletonWrapper>
    ))}
  </>
);

export default SkeletonUI;
