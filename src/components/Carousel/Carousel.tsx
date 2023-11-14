import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Skeleton from "./Skeleton";

interface CarouselProps {
  images: string[];
  onSelect: (selectedIndex: number) => void; // callback function
  isLoading: boolean;
}

interface CarouselItemProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isselected: boolean;
}

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const CarouselItem = styled(
  React.forwardRef<HTMLImageElement, CarouselItemProps>(
    ({ isselected, ...props }, ref) => <img ref={ref} {...props} />
  )
)`
  flex: 0 0 auto; // Ensure items don't stretch
  width: 100%;
  max-width: 300px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  margin: 0 10px;

  ${({ isselected }) =>
    isselected &&
    css`
      transform: scale(1.05);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    `}

  // 720p resolution
    @media (max-width: 1280px) {
    width: calc((100vw - (5px * 12)) / 6); // 5px margin on each side
  }

  // 1080p and above
  @media (min-width: 1281px) {
    width: calc((100vw - (5px * 12)) / 6);
  }
`;

const Carousel = ({ images, onSelect, isLoading }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "Enter") {
        onSelect(currentIndex); // Call onSelect when Enter is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, currentIndex]);

  useEffect(() => {
    const selectedItem = itemRefs.current[currentIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  return (
    <CarouselContainer ref={containerRef}>
      {isLoading ? (
        <Skeleton />
      ) : (
        images.map((image, index) => (
          // ... your CarouselItem components
          <CarouselItem
            key={index}
            src={image}
            alt={`Carousel item ${index}`}
            isselected={index === currentIndex}
            ref={(el) => (itemRefs.current[index] = el)}
          />
        ))
      )}
    </CarouselContainer>
  );
};

export default Carousel;
