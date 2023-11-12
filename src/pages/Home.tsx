import React, { useState } from "react";
import Carousel from "../components/Carousel";
import { useProgramContext } from "../contexts/ProgramContext";
import { Program } from "../hooks/useFetchPrograms";

const Home = () => {
  const { programData, setSelectedProgram } = useProgramContext();

  const handleSelectProgram = (selectedIndex: number) => {
    // Assuming programData.data is an array and has a matching structure
    setSelectedProgram(programData.data[selectedIndex]);
    // Now selectedProgram holds the selected program's data
    // You can do other actions here if needed
  };

  return (
    <div>
      <Carousel
        images={programData.data.map((program) => program.image)}
        onSelect={handleSelectProgram} // Pass the onSelect function
      />
      {/* You can now use selectedProgram here to display more information or perform actions */}
    </div>
  );
};

export default Home;
