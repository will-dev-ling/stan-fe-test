import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header"; // Adjust the import path as necessary

describe("Header", () => {
  it("renders the header with a logo and navigation links", () => {
    render(<Header />);

    // Check for the logo
    const logo = screen.getByAltText("Stan Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("test-file-stub")
    );

    // Check for navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();

    // Check if navigation links have correct href attributes
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("TV Shows").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByText("Movies").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});
