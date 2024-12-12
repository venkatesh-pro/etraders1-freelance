"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Configurator from "./Configurator/Configurator";
import { ConfiguratorData, data } from "@/data";
import Slider from "./Slider/Slider";
import usePreloadImages from "../../hooks/usePreloadImages";
import { gsap } from "gsap/dist/gsap";

type Model = { name: string };
type Color = { name: string };
type Orientation = { name: string };
type Solar = { name: string };

const HomePage = () => {
  const [configuratorData, setConfiguratorData] =
    useState<ConfiguratorData>(data);
  const [isImageChangeScroll, setIsImageChangeScroll] =
    useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState("");
  const [isMirrored, setIsMirrored] = useState(false);

  const [sliderImages, setSliderImages] = useState([
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-1.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-2.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-3.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-4.jpg",
  ]);

  const generateSliderImages = (
    model: Model | undefined,
    color: Color | undefined,
    orientation: Orientation | undefined,
    solar: Solar | undefined
  ) => {
    if (!color || !orientation || !model) return [];

    const basePath = `/ConfiguratorImages/${color.name} COMPRESSED 16:25`;
    const mirroredPath = `/MIRRORED`;
    const orientationPath = orientation.name === "Standard" ? "" : mirroredPath;
    const modelPrefix = model.name === "Space One Plus" ? "25" : "16";
    const solarSuffix = solar?.name === "No solar" ? "" : "-solar";
    const solarImageLength = solarSuffix ? 2 : 4;

    return Array.from({ length: solarImageLength }, (_, index) => {
      const imageIndex = index + 1;
      return `${basePath}${orientationPath}/${modelPrefix}-${color.name.toLowerCase()}${solarSuffix}-${imageIndex}.jpg`;
    });
  };

  const generateSliderImagesForInterior = () => {
    const basePath = `/ConfiguratorImages/INTERIOR COMPRESSED 16:25`;
    const modelPrefix = currentModel === "Space One Plus" ? "25" : "16";

    if (modelPrefix === "16") {
      if (isMirrored) {
        return [
          `${basePath}/MIRRORED/16-open.jpg`,
          `${basePath}/MIRRORED/16-wardorbe.jpg`,
        ];
      } else {
        return [`${basePath}/16-open.jpg`, `${basePath}/16-wardorbe.jpg`];
      }
    } else {
      if (isMirrored) {
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
      setCurrentModel(selectedModel.name);
    }

    const selectedColor = configuratorData.chooseYourFinish.find(
      (d) => d.isSelected
    );
    const selectedOrientation = configuratorData.chooseYourOrientation.find(
      (d) => d.isSelected
    );
    if (selectedOrientation) {
      setIsMirrored(selectedOrientation.name !== "Standard");
    }

    const isSolar = configuratorData.chooseYourEnergy.find((d) => d.isSelected);

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

  const imagesLoaded = usePreloadImages(sliderImages);
  console.log({ imagesLoaded });

  // useEffect(() => {
  //   console.log("changed");
  // }, [sliderImages]);

  // Ref for the Loading Overlay
  const loadingOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingOverlayRef.current) {
      if (!imagesLoaded) {
        // When images start loading, fade in the loading overlay
        gsap.set(loadingOverlayRef.current, { display: "flex" }); // Ensure it's visible
        gsap.to(loadingOverlayRef.current, {
          opacity: 1,
          duration: 0.2,
        });
      } else {
        // When images are loaded, fade out the loading overlay
        gsap.to(loadingOverlayRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(loadingOverlayRef.current, { display: "none" });
          },
        });
      }
    }
  }, [imagesLoaded]);

  return (
    <div className="relative w-full max-h-[100vh] overflow-hidden">
      <Navbar />

      <div className="flex w-full h-screen md:h-[calc(100vh-50px)]">
        {/* Slider Section */}
        <div className="fixed md:static top-0 left-0 w-full md:w-[70%] h-[40vh] md:h-full overflow-hidden z-10 md:z-auto bg-white">
          <div className="relative w-full h-full">
            <Slider sliderImages={sliderImages} />

            {/* Loading Overlay */}
            <div
              ref={loadingOverlayRef}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white"
              style={{ opacity: 0, display: "none" }}
            >
              {/* Loader Animation */}
              <div className="loader"></div>
            </div>
          </div>
        </div>

        {/* Configurator Section */}
        <div className="pt-[40vh] md:pt-0 md:w-[30%] h-full overflow-auto px-10 left-scroll-area">
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
