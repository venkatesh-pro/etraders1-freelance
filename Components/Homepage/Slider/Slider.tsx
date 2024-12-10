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
    <div className="slider w-full min-h-[calc(100vh-50px)]">
      <div className="list w-full " ref={listRef}>
        {sliderImages.map((image: string, i: number) => (
          <div className="item md:w-[60%] w-full h-full" key={i}>
            <img
              src={image}
              alt={`Slide ${i}`}
              className="w-full object-contain h-full"
            />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          id="prev"
          className="rounded-full bg-[#00000026] flex items-center justify-center text-xl"
          onClick={() =>
            setActive((prevActive) =>
              prevActive - 1 < 0 ? sliderImages.length - 1 : prevActive - 1
            )
          }
        >
          <img src="/images/arrow-left.svg" alt="" />
        </button>
        <button
          id="next"
          className="rounded-full bg-[#00000026] flex items-center justify-center text-xl"
          onClick={() =>
            setActive((prevActive) =>
              prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
            )
          }
        >
          <img src="/images/arrow-right.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
