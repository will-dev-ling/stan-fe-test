import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Error from "./Error";

describe("Error", () => {
  it("renders the error message", () => {
    render(<Error />);
    const errorMessage = screen.getByText(
      /an unknown error occured. please try again later/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
