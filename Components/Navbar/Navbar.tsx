"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scrollTop, setScrollTop] = useState(true);

  useEffect(() => {
    // Select the configurator scroll container
    const scroller = document.querySelector<HTMLElement>(".left-scroll-area");
    if (!scroller) return;

    const handleScroll = () => {
      const currentScroll = scroller.scrollTop;
      // Check if at the very top of the scroll container
      setScrollTop(currentScroll <= 0);

      // Determine scroll direction: scrolling down when currentScroll > lastScrollPosition
      setIsScrollingDown(
        currentScroll > lastScrollPosition && currentScroll > 0
      );
      setLastScrollPosition(currentScroll);
    };

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <div
      className={`
        bg-red-400  w-full h-[50px] z-50 
        flex items-center 
        transition-transform duration-300
        sticky top-0
        md:relative 
        ${
          // When at top or scrolling up: translate-y-0 (visible)
          // When scrolling down: -translate-y-full (hidden)
          scrollTop || !isScrollingDown ? "translate-y-0" : "-translate-y-full"
        }
      `}
    >
      <Image width={100} height={100} src={"/images/logo.svg"} alt="logo" />
    </div>
  );
};

export default Navbar;
