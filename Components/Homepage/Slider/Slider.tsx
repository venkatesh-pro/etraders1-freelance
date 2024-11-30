import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

const Slider = ({ sliderImages }) => {
  const listRef = useRef(null);
  const dotsRef = useRef([]);
  const [active, setActive] = useState(0);

  const reloadSlider = () => {
    if (!listRef.current) return;

    const items = listRef.current.children;
    const dots = dotsRef.current;

    if (items.length === 0 || dots.length === 0) return;

    const checkLeft = items[active].offsetLeft;
    listRef.current.style.left = -checkLeft + "px";

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === active);
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
    }, 6000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  if (!sliderImages || sliderImages.length === 0) {
    return <div>No images available</div>; // Handle empty images gracefully
  }

  return (
    <div className="slider w-full">
      <div className="list  " ref={listRef}>
        {sliderImages.map((image, i) => (
          <div className="item  w-[70vw]" key={i}>
            <img src={image} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
      <ul className="dots">
        {sliderImages.map((_, i) => (
          <li
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
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
