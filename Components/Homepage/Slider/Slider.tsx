import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

interface SliderProps {
  sliderImages: string[];
}

const Slider: React.FC<SliderProps> = ({ sliderImages }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const reloadSlider = () => {
    if (!listRef.current) return;

    const items = Array.from(listRef.current.children) as HTMLElement[];
    if (items.length === 0) return;

    const checkLeft = items[active].offsetLeft;
    listRef.current.style.left = -checkLeft + "px";
  };

  useEffect(() => {
    reloadSlider();
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) =>
        prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    // Ensure `active` is within the valid range of the new `sliderImages` length
    setActive((prevActive) =>
      prevActive >= sliderImages.length ? sliderImages.length - 1 : prevActive
    );
  }, [sliderImages]);

  if (!sliderImages || sliderImages.length === 0) {
    return <div>No images available</div>; // Handle empty images gracefully
  }

  return (
    <div className="slider w-full">
      <div className="list" ref={listRef}>
        {sliderImages.map((image: string, i: number) => (
          <div className="item w-[70vw]" key={i}>
            <img src={image} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          id="prev"
          className="rounded-full text-xl"
          onClick={() =>
            setActive((prevActive) =>
              prevActive - 1 < 0 ? sliderImages.length - 1 : prevActive - 1
            )
          }
        >
          {"<"}
        </button>
        <button
          id="next"
          className="rounded-full text-xl"
          onClick={() =>
            setActive((prevActive) =>
              prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
            )
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Slider;
