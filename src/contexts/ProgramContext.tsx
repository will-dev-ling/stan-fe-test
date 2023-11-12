import React, { createContext, ReactNode, useContext, useState } from "react";
import useFetchPrograms, {
  ProgramDataType,
  Program,
} from "../hooks/useFetchPrograms";

export type ProgramContextType = {
  programData: ProgramDataType;
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program | null) => void; // Add a function type for updating the selected program
};

const emptyProgamContext: ProgramContextType = {
  programData: {
    status: "idle",
    data: [],
    errorMessage: "",
  },
  selectedProgram: null,
  setSelectedProgram: () => {}, // Initialize the function with an empty function for now
};

// Initialize the context with undefined for now since we will be populating it with actual values below.
export const ProgramContext =
  createContext<ProgramContextType>(emptyProgamContext);

const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const programData = useFetchPrograms();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null); // State to hold the selected program

  // A function to update the selected program
  const handleSetSelectedProgram = (program: Program | null) => {
    setSelectedProgram(program);
  };

  return (
    <ProgramContext.Provider
      value={{
        programData,
        selectedProgram,
        setSelectedProgram: handleSetSelectedProgram, // Pass the function down through the context
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

// Custom hook to use the program context
export const useProgramContext = () => {
  const ctx = useContext(ProgramContext);

  if (!ctx)
    throw new Error("useProgramContext must be used within a ProgramProvider");

  return ctx;
};

export default ProgramProvider;
