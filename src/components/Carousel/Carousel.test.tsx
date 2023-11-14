import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

beforeEach(() => {
  // Mock the scrollIntoView function
  window.HTMLElement.prototype.scrollIntoView = function () {};
});

describe("Carousel", () => {
  const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const mockOnSelect = jest.fn();

  it("renders skeleton loaders when loading", () => {
    const { queryAllByTestId } = render(
      <Carousel images={[]} onSelect={mockOnSelect} isLoading={true} />
    );

    const skeletons = queryAllByTestId("skeleton");
    expect(skeletons).toHaveLength(6);
  });

  it("renders images when not loading", () => {
    const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];
    const mockOnSelect = jest.fn();

    const { queryAllByRole } = render(
      <Carousel images={mockImages} onSelect={mockOnSelect} isLoading={false} />
    );

    const images = queryAllByRole("img");
    expect(images).toHaveLength(mockImages.length);
  });

  it("calls onSelect with the current index when the Enter key is pressed", () => {
    // Render the Carousel component with mock props
    render(
      <Carousel images={mockImages} onSelect={mockOnSelect} isLoading={false} />
    );

    // Simulate the Enter key press
    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });

    // Check if onSelect has been called with the current index
    // The current index is initially set to 0, so we expect that value.
    expect(mockOnSelect).toHaveBeenCalledWith(0);
  });
});
