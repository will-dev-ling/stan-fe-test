import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useFetchPrograms, { ProgramDataType } from "../hooks/useFetchPrograms";
import { Program } from "../types/Program";

export type ProgramContextType = {
  programData: ProgramDataType;
  selectedProgram: Program | null;
  hasError: boolean;
  setSelectedProgram: (id: number) => void; // Change the function type to accept an ID
};

const emptyProgamContext: ProgramContextType = {
  programData: {
    status: "fetching",
    data: [],
  },
  hasError: false,
  selectedProgram: null,
  setSelectedProgram: () => {}, // This is fine as it's just an initial value
};

export const ProgramContext =
  createContext<ProgramContextType>(emptyProgamContext);

const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const programData = useFetchPrograms();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (programData.status === "error") {
      setHasError(true);
    }
  }, [programData.status]);

  // The type of 'id' is number, to match the new type in ProgramContextType
  // Also memoize the function to improve performance
  const handleSetSelectedProgram = useCallback(
    (id: number) => {
      const program =
        programData.data.find((program) => program.id === id) || null;
      if (programData.data.length > 0 && !program) {
        setHasError(true);
      }
      setSelectedProgram(program);
    },
    [programData.data]
  );

  // Memoizing the provider value to improve performance
  const providerValue = useMemo(
    () => ({
      programData,
      hasError,
      selectedProgram,
      setSelectedProgram: handleSetSelectedProgram,
    }),
    [programData, hasError, selectedProgram, handleSetSelectedProgram]
  );

  return (
    <ProgramContext.Provider value={providerValue}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramContext = () => {
  const ctx = useContext(ProgramContext);

  if (!ctx) {
    throw new Error("useProgramContext must be used within a ProgramProvider");
  }

  return ctx;
};

export default ProgramProvider;
