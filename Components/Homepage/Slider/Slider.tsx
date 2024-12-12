import React, { useEffect, useState } from "react";

interface SliderProps {
  sliderImages: string[];
}

const Slider: React.FC<SliderProps> = ({ sliderImages }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) =>
        prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    setActive((prevActive) =>
      prevActive >= sliderImages.length ? sliderImages.length - 1 : prevActive
    );
  }, [sliderImages]);

  if (!sliderImages || sliderImages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        No images available
      </div>
    );
  }

  const translateValue = `translateX(-${active * 100}%)`;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: translateValue }}
      >
        {sliderImages.map((image, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Slide ${i}`}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="absolute top-1/2 left-1/20 transform -translate-y-1/2 w-[90%] flex justify-between">
        <button
          onClick={() =>
            setActive((prevActive) =>
              prevActive - 1 < 0 ? sliderImages.length - 1 : prevActive - 1
            )
          }
          className="w-[50px] h-[50px] rounded-full bg-[#00000026] flex items-center justify-center border-none font-mono font-bold"
        >
          <img src="/images/arrow-left.svg" alt="Previous" />
        </button>
        <button
          onClick={() =>
            setActive((prevActive) =>
              prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
            )
          }
          className="w-[50px] h-[50px] rounded-full bg-[#00000026] flex items-center justify-center border-none font-mono font-bold"
        >
          <img src="/images/arrow-right.svg" alt="Next" />
        </button>
      </div>

      {/* Dots (If you want them) */}
      {/* Example of tailwind classes for dots:
      <ul className="absolute bottom-[10px] left-0 w-full flex justify-center text-white transition-all duration-1000">
        {sliderImages.map((_, index) => (
          <li
            key={index}
            className={`list-none w-[10px] h-[10px] bg-white m-[10px] rounded-full ${
              index === active ? "w-[30px]" : ""
            }`}
          ></li>
        ))}
      </ul>
      */}
    </div>
  );
};

export default Slider;
