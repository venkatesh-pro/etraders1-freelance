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
        <div className="w-[70%] h-[calc(100vh-50px)] mt-[calc(100vh-(100vh-50px))] fixed top-0 bottom-0 left-0 ">
          <Slider sliderImages={sliderImages} />
        </div>

        {/* Configurator */}

        <div id="smooth-content">
          <div className="overflow-scroll px-10 " style={{
            marginTop:'40px'
          }}>
            <Configurator
              configuratorData={configuratorData}
              setConfiguratorData={setConfiguratorData}
              setSliderImages={setSliderImages}
              setIsImageChangeScroll={setIsImageChangeScroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
