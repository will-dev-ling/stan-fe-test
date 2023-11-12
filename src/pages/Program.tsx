import React from "react";
import { useParams } from "react-router-dom";
import { useProgramContext } from "../contexts/ProgramContext";

const Program = () => {
  // Use useParams to get the dynamic parts of the URL.
  const { id } = useParams<{ id: string }>();

  const { programData } = useProgramContext();

  console.log("id", id);
  console.log("programData", programData);

  return <div>Program ID: {id}</div>;
};

export default Program;
