import React, { useCallback } from "react";
import Carousel from "../components/Carousel";
import { useProgramContext } from "../contexts/ProgramContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { programData, setSelectedProgram } = useProgramContext();
  const navigate = useNavigate();

  // Memoizing function to improve performance
  const handleSelectProgram = useCallback(
    (selectedIndex: number) => {
      const programId = programData.data[selectedIndex].id;
      setSelectedProgram(programId);
      navigate(`/program/${programId}`);
    },
    [programData.data]
  );

  return (
    <Carousel
      images={programData.data.map((program) => program.image)}
      onSelect={handleSelectProgram} // Pass the onSelect function
      isLoading={programData.status === "fetching"}
    />
  );
};

export default Home;
