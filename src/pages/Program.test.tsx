import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing routing
import Program from "./Program";
import { ProgramContext, ProgramContextType } from "../contexts/ProgramContext";
import { Program as ProgramType } from "../types/Program";

// Mock the useFetchPrograms hook if it's used in the ProgramProvider
jest.mock("../hooks/useFetchPrograms", () => ({
  useFetchPrograms: () => ({
    status: "fetched",
    data: [{ id: 1, title: "Mock Title" }],
    setSelectedProgram: jest.fn(),
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Preserves non-hook exports
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Program", () => {
  const mockProgram: ProgramType = {
    id: 1,
    title: "Mock Title",
    description: "Mock Description",
    image: "mock-image.jpg",
    rating: "PG",
    year: 2021,
    genre: "Comedy",
    language: "English",
    type: "series",
  };

  const mockContextValue: ProgramContextType = {
    programData: {
      status: "fetched",
      data: [mockProgram],
    },
    hasError: false,
    selectedProgram: mockProgram,
    setSelectedProgram: jest.fn(),
  };

  const mockUseParams = jest.requireMock("react-router-dom").useParams;
  const mockUseNavigate = jest.requireMock("react-router-dom").useNavigate;

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: "1" });
    mockUseNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays program details when selectedProgram is set", () => {
    // Create a mock context value

    // Wrap the component in the ProgramProvider with the mocked context
    render(
      <MemoryRouter>
        <ProgramContext.Provider value={mockContextValue}>
          <Program />
        </ProgramContext.Provider>
      </MemoryRouter>
    );

    // Assertions to check if the program details are displayed
    expect(screen.getByText(mockProgram.title)).toBeInTheDocument();
    expect(screen.getByText(mockProgram.description)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockProgram.title} Cover`)
    ).toBeInTheDocument();
  });

  it('navigates to the root path when "Backspace" is pressed', () => {
    const mockNavigate = jest.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ProgramContext.Provider value={mockContextValue}>
          <Program />
        </ProgramContext.Provider>
      </MemoryRouter>
    );

    // Simulate the "Backspace" key press
    fireEvent.keyDown(window, { key: "Backspace", code: "Backspace" });

    // Assert that navigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders the skeleton UI when no program is selected", () => {
    render(
      <MemoryRouter>
        <ProgramContext.Provider
          value={{ ...mockContextValue, selectedProgram: null }}
        >
          <Program />
        </ProgramContext.Provider>
      </MemoryRouter>
    );

    // Check for the presence of skeleton elements
    expect(screen.getByTestId("image-skeleton")).toBeInTheDocument();
  });
});
