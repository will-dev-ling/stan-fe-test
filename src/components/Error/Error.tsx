import React from "react";
import styled from "styled-components";

const ErrorHeader = styled.h1`
  background-color: #000;
  color: #6a6a6a;
  padding-left: 20px;
  font-size: 1.5em;
`;

const Error = (): JSX.Element => {
  return (
    <ErrorHeader>An unknown error occured. Please try again later</ErrorHeader>
  );
};

export default Error;
