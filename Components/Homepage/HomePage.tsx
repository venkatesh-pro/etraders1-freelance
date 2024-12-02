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
  const [isImageChangeScroll, setIsImageChangeScroll] = useState(false);

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
    const solarImageLenght = 4;
    // Generate image URLs for 4 images
    return Array.from(
      { length: solarSuffix ? solarImageLenght : 4 },
      (_, index) => {
        const imageIndex = index + 1;
        return `${basePath}${orientationPath}/${modelPrefix}-${color?.name.toLocaleLowerCase()}${solarSuffix}-${imageIndex}.jpg`;
      }
    );
  };

  const imageStoreInStateFunction = () => {
    const selectedModel = configuratorData.chooseYourModel.find(
      (d) => d.isSelected
    );
    const selectedColor = configuratorData.chooseYourFinish.find(
      (d) => d.isSelected
    );
    const selectedOrientation = configuratorData.chooseYourOrientation.find(
      (d) => d.isSelected
    );
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

  return (
    <div className="overflow-hidden">
      {/* <pre>{JSON.stringify(configuratorData, null, 4)}</pre> */}
      <Navbar />
      <div className="flex h-[calc(100vh-50px)] justify-between">
        {/* Images */}
        <div className="w-[70%]">
          <Slider sliderImages={sliderImages} />
        </div>

        {/* Configurator */}
        <div className="w-[30%] overflow-scroll px-10 left-scroll-area">
          <Configurator
            configuratorData={configuratorData}
            setConfiguratorData={setConfiguratorData}
            setSliderImages={setSliderImages}
            isImageChangeScroll={isImageChangeScroll}
            setIsImageChangeScroll={setIsImageChangeScroll}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
