import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

const Slider = ({ sliderImages }) => {
  const listRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
    const items = listRef.current?.children || [];
    const dots = dotsRef.current || [];
    const lengthItems = items.length - 1;

    const handleNextClick = () => {
      setActive((prevActive) =>
        prevActive + 1 > lengthItems ? 0 : prevActive + 1
      );
    };

    const handlePrevClick = () => {
      setActive((prevActive) =>
        prevActive - 1 < 0 ? lengthItems : prevActive - 1
      );
    };

    // Attach event listeners
    const nextButton = nextRef.current;
    const prevButton = prevRef.current;

    nextButton?.addEventListener("click", handleNextClick);
    prevButton?.addEventListener("click", handlePrevClick);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => setActive(index));
    });

    // Clean up event listeners on unmount
    return () => {
      nextButton?.removeEventListener("click", handleNextClick);
      prevButton?.removeEventListener("click", handlePrevClick);
    };
  }, []);

  useEffect(() => {
    reloadSlider();
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextRef.current?.click();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="list" ref={listRef}>
        {sliderImages.map((image, i) => (
          <div className="item" key={i}>
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
          ></li>
        ))}
      </ul>
      <div className="buttons">
        <button id="prev" ref={prevRef}>
          {"<"}
        </button>
        <button id="next" ref={nextRef}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Slider;
