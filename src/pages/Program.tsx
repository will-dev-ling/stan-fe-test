import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useProgramContext } from "../contexts/ProgramContext";

interface TextSkeletonProps {
  height?: string;
  width?: string;
}

const ProgramDetail = styled.div`
  background-color: #000000;
  padding: 1em;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5em;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProgramImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 0;
  color: #fff;
`;

const Details = styled.div`
  font-size: 0.85em;
  color: #aaa;
  margin: 0.5em 0;
`;

const Description = styled.p`
  font-size: 1em;
  color: #ddd;
`;

const ImageSkeleton = styled.div`
  background-color: #333;
  width: 100%;
  max-width: 400px;
  height: 600px;
  border-radius: 4px;
`;

const TextSkeleton = styled.div<TextSkeletonProps>`
  height: ${({ height }) => height || "200px"};
  width: ${({ width }) => width || "100%"};
  margin-bottom: 20px;
  background-color: #333;
  border-radius: 4px;
`;

const DetailsSkeleton = styled.div`
  width: 50%;
  max-height: 300px;
`;

const Program: React.FC = () => {
  // Use useParams to get the dynamic parts of the URL.
  const { id } = useParams();
  const navigate = useNavigate(); // Instantiate navigate function

  const { setSelectedProgram, selectedProgram } = useProgramContext();

  // Set the selected program based on the ID when the component mounts
  useEffect(() => {
    id && setSelectedProgram(parseInt(id));
  }, [id, setSelectedProgram]);

  useEffect(() => {
    const handleBackspace = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        event.preventDefault(); // Prevent the default backspace action
        navigate("/"); // Navigate to the root path
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleBackspace);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [navigate]);

  const SkeletonUI = () => (
    <>
      <ImageSkeleton data-testid="image-skeleton" />
      <DetailsSkeleton>
        <TextSkeleton height={"20px"} width={"30%"} />
        <TextSkeleton height={"20px"} width={"50%"} />
        <TextSkeleton height={"220px"} />
      </DetailsSkeleton>
    </>
  );

  return (
    <ProgramDetail>
      {selectedProgram ? (
        <>
          <ImageContainer>
            <ProgramImage
              src={selectedProgram?.image}
              alt={`${selectedProgram?.title} Cover`}
            />
          </ImageContainer>
          <DetailsContainer>
            <Title>{selectedProgram?.title}</Title>
            <Details>
              {selectedProgram?.rating} | {selectedProgram?.year} |{" "}
              {selectedProgram?.genre} | {selectedProgram?.language}
            </Details>
            <Description>{selectedProgram?.description}</Description>
          </DetailsContainer>
        </>
      ) : (
        <SkeletonUI />
      )}
    </ProgramDetail>
  );
};

export default Program;
