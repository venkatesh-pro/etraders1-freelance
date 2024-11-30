"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Configurator from "./Configurator/Configurator";
import { data } from "@/data";
import Slider from "./Slider/Slider";

const HomePage = () => {
  const [configuratorData, setConfiguratorData] = useState(data);

  const [sliderImages, setSliderImages] = useState([
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-1.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-2.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-3.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-4.jpg",
  ]);

  useEffect(() => {
    const selectedModel = configuratorData.chooseYourModel.find(
      (d) => d.isSelected
    );
    const selectedColor = configuratorData.chooseYourFinish.find(
      (d) => d.isSelected
    );

    const selectedOrientation = configuratorData.chooseYourOrientation.find(
      (d) => d.isSelected
    );
    console.log(selectedColor);

    if (selectedModel?.name === "Space One") {
      setSliderImages([
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-1.jpg`
            : `/MIRRORED/16-${selectedColor?.name.toLocaleLowerCase()}-1.jpg`
        }`,

        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-2.jpg`
            : `/MIRRORED/16-${selectedColor?.name.toLocaleLowerCase()}-2.jpg`
        }`,
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-3.jpg`
            : `/MIRRORED/16-${selectedColor?.name.toLocaleLowerCase()}-3.jpg`
        }`,
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-4.jpg`
            : `/MIRRORED/16-${selectedColor?.name.toLocaleLowerCase()}-4.jpg`
        }`,
      ]);
    } else if (selectedModel?.name === "Space One Plus") {
      setSliderImages([
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-1.jpg`
            : `/MIRRORED/25-${selectedColor?.name.toLocaleLowerCase()}-1.jpg`
        }`,

        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-2.jpg`
            : `/MIRRORED/25-${selectedColor?.name.toLocaleLowerCase()}-2.jpg`
        }`,
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-3.jpg`
            : `/MIRRORED/25-${selectedColor?.name.toLocaleLowerCase()}-3.jpg`
        }`,
        `/ConfiguratorImages/${selectedColor?.name} COMPRESSED 16:25/${
          selectedOrientation?.name === "Standard"
            ? `16-${selectedColor?.name.toLocaleLowerCase()}-4.jpg`
            : `/MIRRORED/25-${selectedColor?.name.toLocaleLowerCase()}-4.jpg`
        }`,
      ]);
    }
  }, [configuratorData]);

  return (
    <div className="overflow-hidden">
      {/* <pre>{JSON.stringify(configuratorData, null, 4)}</pre> */}
      <Navbar />
      <div className="flex h-[calc(100vh-50px)] justify-between">
        {/* images */}
        <div className="w-[70%] ">
          <Slider sliderImages={sliderImages} />
        </div>

        {/* configurator */}
        <div className="w-[30%] overflow-scroll px-10">
          <Configurator
            configuratorData={configuratorData}
            setConfiguratorData={setConfiguratorData}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
