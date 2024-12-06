"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Configurator from "./Configurator/Configurator";
import { ConfiguratorData, data } from "@/data";
import Slider from "./Slider/Slider";

type Model = {
  name: string;
};

type Color = {
  name: string;
};

type Orientation = {
  name: string;
};

type Solar = {
  name: string;
};

const HomePage = () => {
  const [configuratorData, setConfiguratorData] =
    useState<ConfiguratorData>(data);
  const [isImageChangeScroll, setIsImageChangeScroll] =
    useState<boolean>(false);

  // 16 or 25 sq metres
  const [currentModel, setCurrentModel] = useState("");

  const [isMirrored, setIsMirrored] = useState(false);

  const [sliderImages, setSliderImages] = useState([
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-1.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-2.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-3.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-4.jpg",
  ]);

  // Utility function to generate slider images dynamically
  const generateSliderImages = (
    model: Model | undefined,
    color: Color | undefined,
    orientation: Orientation | undefined,
    solar: Solar | undefined
  ) => {
    if (!color || !orientation || !model) return [];

    const basePath = `/ConfiguratorImages/${color?.name} COMPRESSED 16:25`;
    const mirroredPath = `/MIRRORED`;
    const orientationPath =
      orientation?.name === "Standard" ? "" : mirroredPath;
    const modelPrefix = model?.name === "Space One Plus" ? "25" : "16";
    const solarSuffix = solar?.name === "No solar" ? "" : "-solar"; // Add suffix for solar condition
    const solarImageLenght = 2;
    // Generate image URLs for 4 images
    return Array.from(
      { length: solarSuffix ? solarImageLenght : 4 },
      (_, index) => {
        const imageIndex = index + 1;
        return `${basePath}${orientationPath}/${modelPrefix}-${color?.name.toLocaleLowerCase()}${solarSuffix}-${imageIndex}.jpg`;
      }
    );
  };
  const generateSliderImagesForInterior = () => {
    // if (!color || !orientation || !model) return [];

    const basePath = `/ConfiguratorImages/INTERIOR COMPRESSED 16:25`;
    const mirroredPath = `/MIRRORED`;

    const modelPrefix = currentModel === "Space One Plus" ? "25" : "16";
    console.log({ modelPrefix, currentModel });

    if (modelPrefix === "16") {
      if (mirroredPath) {
        return [
          `${basePath}/MIRRORED/16-open.jpg`,
          `${basePath}/MIRRORED/16-wardorbe.jpg`,
        ];
      } else {
        return [`${basePath}/16-open.jpg`, `${basePath}/16-wardorbe.jpg`];
      }
    } else {
      if (mirroredPath) {
        return [
          `${basePath}/MIRRORED/25-bathroom-ensuite.jpg`,
          `${basePath}/MIRRORED/25-kitchen-1.jpg`,
          `${basePath}/MIRRORED/25-kitchen-2.jpg`,
          `${basePath}/MIRRORED/25-wardrobe-ensuite.jpg`,
        ];
      } else {
        return [
          `${basePath}/25-bathroom-ensuite.jpg`,
          `${basePath}/25-kitchen-1.jpg`,
          `${basePath}/25-kitchen-2.jpg`,
          `${basePath}/25-wardrobe-ensuite.jpg`,
        ];
      }
    }
  };

  const imageStoreInStateFunction = () => {
    const selectedModel = configuratorData.chooseYourModel.find(
      (d) => d.isSelected
    );

    if (selectedModel) {
      setCurrentModel(selectedModel?.name);
    }

    const selectedColor = configuratorData.chooseYourFinish.find(
      (d) => d.isSelected
    );
    const selectedOrientation = configuratorData.chooseYourOrientation.find(
      (d) => d.isSelected
    );
    if (selectedOrientation) {
      setIsMirrored(selectedOrientation.name === "Standard" ? false : true);
    }

    const isSolar = configuratorData.chooseYourEnergy.find((d) => d.isSelected);

    // Update slider images dynamically
    setSliderImages(
      generateSliderImages(
        selectedModel,
        selectedColor,
        selectedOrientation,
        isSolar
      )
    );
  };
  useEffect(() => {
    if (configuratorData) {
      imageStoreInStateFunction();
    }
  }, [configuratorData, isImageChangeScroll]);
  // useEffect(() => {
  //   let lenis;

  //   (async () => {
  //     const Lenis = (await import("lenis")).default;

  //     // Initialize Lenis
  //     lenis = new Lenis({
  //       smooth: true, // Enables smooth scrolling
  //       duration: 4, // Duration of the smooth scroll effect
  //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  //       direction: "vertical", // Scrolling direction (vertical/horizontal)
  //     });

  //     // Log scroll event for debugging
  //     lenis.on("scroll", (e) => {
  //       console.log("Scroll event:", e);
  //     });

  //     // Animation frame loop to ensure Lenis runs smoothly
  //     function raf(time) {
  //       lenis.raf(time);
  //       requestAnimationFrame(raf);
  //     }

  //     requestAnimationFrame(raf);
  //   })();

  //   // Cleanup on component unmount
  //   return () => {
  //     if (lenis) lenis.destroy();
  //   };
  // }, []);

  return (
    <div className="overflow-hidden">
      {/* <pre>{JSON.stringify(isMirrored, null, 4)}</pre> */}
      <Navbar />
      <div className="flex h-[calc(100vh-50px)] justify-between">
        {/* Images */}
        <div className="w-[70%] top-0 bottom-0 left-0 h-[calc(100vh-50px)] ">
          <Slider sliderImages={sliderImages} />
        </div>

        {/* Configurator */}

        <div className="px-10 w-[30%] overflow-scroll left-scroll-area">
          <Configurator
            currentModel={currentModel}
            isMirrored={isMirrored}
            configuratorData={configuratorData}
            setConfiguratorData={setConfiguratorData}
            setSliderImages={setSliderImages}
            setIsImageChangeScroll={setIsImageChangeScroll}
            generateSliderImagesForInterior={generateSliderImagesForInterior}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
