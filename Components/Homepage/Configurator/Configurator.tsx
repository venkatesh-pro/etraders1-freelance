"use client";
import { formatNumberToCurrency } from "@/utils/functions";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ConfiguratorData } from "@/data";

gsap.registerPlugin(ScrollTrigger);

interface ConfiguratorProps {
  configuratorData: ConfiguratorData;
  setConfiguratorData: (data: ConfiguratorData) => void;
  setSliderImages: (images: string[]) => void;
  isImageChangeScroll: boolean;
  setIsImageChangeScroll: (value: boolean) => void;
}

const Configurator: React.FC<ConfiguratorProps> = ({
  configuratorData,
  setConfiguratorData,
  setSliderImages,
  isImageChangeScroll,
  setIsImageChangeScroll,
}) => {
  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: true,
        scroller: ".left-scroll-area",

        onEnter: () => {
          console.log("Entered section3");
          setSliderImages([
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-open.jpg",
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-wardorbe.jpg",
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-open.jpg",
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-wardorbe.jpg",
          ]);
        },
        onLeave: () => {
          console.log("Left section3");
          setIsImageChangeScroll(!isImageChangeScroll);
        },
        onEnterBack: () => {
          console.log("Re-entering section3 from below");
          setSliderImages([
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-open.jpg",
            "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-wardorbe.jpg",
          ]);
        },
        onLeaveBack: () => {
          console.log("Leaving section3 from above");

          setIsImageChangeScroll(!isImageChangeScroll);
        },
      },
    });
  }, []);
  return (
    <div className="h-full ">
      {/* section 1 */}
      <div className="section1">
        <h1 className="text-[40px]">Space One</h1>
        <p className="text-[#808080] mt-[20px]">
          Configure your Space One design. Choose a layout, pick your cladding
          colour, and optional accessories.
        </p>
        <p className="text-[18px] mt-[120px]">Choose your model</p>
        {configuratorData.chooseYourModel.map((d, i) => {
          return (
            <div
              key={i}
              style={{
                borderColor: `${d.isSelected ? "#0096F7" : ""}`,
              }}
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
              onClick={() => {
                const updatedData: ConfiguratorData = {
                  ...configuratorData,
                  chooseYourModel: configuratorData.chooseYourModel.map(
                    (model) =>
                      model.name === d.name
                        ? { ...model, isSelected: true }
                        : { ...model, isSelected: false }
                  ),
                };

                setConfiguratorData(updatedData);
              }}
            >
              <div>
                <p>{d.name}</p>
                <p>{d.length}</p>
              </div>
              <div>From {formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}
      </div>

      {/* section 2 */}
      <div className="" id="section2">
        <p className="text-[18px] mt-[120px]">Choose your finish</p>
        <div className={`flex justify-between max-w-[290px] mt-[17px]`}>
          {configuratorData.chooseYourFinish.map((d, i) => {
            console.log({ d });

            return (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  const updatedData: ConfiguratorData = {
                    ...configuratorData,
                    chooseYourFinish: configuratorData.chooseYourFinish.map(
                      (model) =>
                        model.name === d.name
                          ? { ...model, isSelected: true }
                          : { ...model, isSelected: false }
                    ),
                  };

                  setConfiguratorData(updatedData);
                }}
              >
                <div
                  className={` flex items-center justify-center p-1 border-2 border-transparent  ${
                    d.isSelected ? "border-2 rounded-full border-black" : ""
                  }`}
                  style={{
                    border: `${
                      d.isSelected ? "2px solid black" : "2px solid transparent"
                    }`,
                  }}
                >
                  <div
                    className={` w-[38.89px] h-[38.89px] rounded-full`}
                    style={{
                      background: d.color,
                    }}
                  ></div>
                </div>

                <p className="mt-2 text-sm text-center capitalize">{d.name}</p>
                {/* <p className="text-sm text-center">${data.price}</p> */}
              </div>
            );
          })}
        </div>

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[120px]">Choose your orientation</p>
        {configuratorData.chooseYourOrientation.map((d, i) => {
          return (
            <div
              key={i}
              style={{
                borderColor: `${d.isSelected ? "#0096F7" : ""}`,
              }}
              className=" border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
              onClick={() => {
                const updatedData: ConfiguratorData = {
                  ...configuratorData,
                  chooseYourOrientation:
                    configuratorData.chooseYourOrientation.map((model) =>
                      model.name === d.name
                        ? { ...model, isSelected: true }
                        : { ...model, isSelected: false }
                    ),
                };

                setConfiguratorData(updatedData);
              }}
            >
              <p>{d.name}</p>
              <p className="text-[#808080] text-[12px]">{d.description}</p>
            </div>
          );
        })}
      </div>

      {/* section 3 */}
      <div className="" id="section3">
        <p className="text-[18px] mt-[120px]">Choose your layout</p>
        {configuratorData.chooseYourLayout.map((d, i) => {
          return (
            <div
              key={i}
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
            >
              <div>
                <p>{d.name}</p>
                <p>{d.description}</p>
              </div>
              <div>From {formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[120px]">Optional upgrades</p>
        {configuratorData.optionalUpgradesForLayout.map((d, i) => {
          return (
            <div
              key={i}
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
            >
              <div>
                <p>{d.name}</p>
                <p>{d.description}</p>
              </div>
              <div>{formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}
      </div>

      {/* section 4 */}
      <div className="" id="section4">
        <p className="text-[18px] mt-[120px]">Choose your energy</p>
        {configuratorData.chooseYourEnergy.map((d, i) => {
          return (
            <div
              key={i}
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
              style={{
                borderColor: `${d.isSelected ? "#0096F7" : ""}`,
              }}
              onClick={() => {
                const updatedData: ConfiguratorData = {
                  ...configuratorData,
                  chooseYourEnergy: configuratorData.chooseYourEnergy.map(
                    (model) =>
                      model.name === d.name
                        ? { ...model, isSelected: true }
                        : { ...model, isSelected: false }
                  ),
                };

                setConfiguratorData(updatedData);
              }}
            >
              <div>
                <p>{d.name}</p>
                <p>{d.description}</p>
              </div>
              {d?.price && <div>{formatNumberToCurrency(d.price)}</div>}
            </div>
          );
        })}

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[120px]">Optional upgrades</p>
        {configuratorData.optionalUpgradesForEnergy.map((d, i) => {
          return (
            <div
              key={i}
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
            >
              <div>
                <p>{d.name}</p>
                <p>{d.description}</p>
              </div>
              <div>{formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}
      </div>

      {/* final section 4 */}
      <div className="" id="section5">
        <p className="text-[24px] mt-[120px]">Your configuration</p>
        <div className="h-[300px]"></div>
      </div>
    </div>
  );
};

export default Configurator;
