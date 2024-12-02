import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

interface SliderProps {
  sliderImages: string[];
}

const Slider: React.FC<SliderProps> = ({ sliderImages }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const reloadSlider = () => {
    if (!listRef.current) return;

    const items = Array.from(listRef.current.children) as HTMLElement[];
    const dots = dotsRef.current;

    if (items.length === 0 || dots.length === 0) return;

    const checkLeft = items[active].offsetLeft;
    listRef.current.style.left = -checkLeft + "px";

    // Update dots
    dots.forEach((dot, index) => {
      dot?.classList.toggle("active", index === active);
    });
  };

  useEffect(() => {
    reloadSlider();
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) =>
        prevActive + 1 >= sliderImages.length ? 0 : prevActive + 1
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    // Reset to the first image when images change
    setActive(0);
  }, [sliderImages]);

  if (!sliderImages || sliderImages.length === 0) {
    return <div>No images available</div>; // Handle empty images gracefully
  }

  return (
    <div className="slider w-full">
      <div className="list" ref={listRef}>
        {sliderImages.map((image: string, i: number) => (
          <div className="item w-[70vw] bg-red-600" key={i}>
            <img src={image} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
      <ul className="dots">
        {sliderImages.map((_: string, i: number) => (
          <li
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)} // Use onClick for dots
          ></li>
        ))}
      </ul>
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
