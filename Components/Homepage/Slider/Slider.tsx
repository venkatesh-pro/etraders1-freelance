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
    <div className="slider relative w-full h-full overflow-hidden">
      <div
        className="list flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: translateValue }}
      >
        {sliderImages.map((image, i) => (
          <div
            key={i}
            className="item flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Slide ${i}`}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>

      <div className="buttons absolute top-1/2 left-[5%] transform -translate-y-1/2 w-[90%] flex justify-between">
        <button
          onClick={() =>
            setActive((prevActive) =>
              prevActive - 1 < 0 ? sliderImages.length - 1 : prevActive - 1
            )
          }
          className="w-[50px] h-[50px] rounded-full bg-[#00000026] flex items-center justify-center"
        >
          <img src="/images/arrow-left.svg" alt="Previous" />
        </button>
        <button
          onClick={() =>
            setActive((prevActive) =>
              prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
            )
          }
          className="w-[50px] h-[50px] rounded-full bg-[#00000026] flex items-center justify-center"
        >
          <img src="/images/arrow-right.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
