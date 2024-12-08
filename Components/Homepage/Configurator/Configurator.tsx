"use client";
import { formatNumberToCurrency } from "@/utils/functions";
import React from "react";
import { gsap } from "gsap/dist/gsap";
import { ConfiguratorData } from "@/data";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ConfiguratorProps {
  currentModel: string;
  isMirrored: boolean;
  configuratorData: ConfiguratorData;
  setConfiguratorData: (data: ConfiguratorData) => void;
  setSliderImages: (images: string[]) => void;
  setIsImageChangeScroll: React.Dispatch<React.SetStateAction<boolean>>;
  generateSliderImagesForInterior: () => string[];
}

const Configurator: React.FC<ConfiguratorProps> = ({
  currentModel,
  isMirrored,
  configuratorData,
  setConfiguratorData,
  setSliderImages,
  setIsImageChangeScroll,
  generateSliderImagesForInterior,
}) => {
  // useLayoutEffect(() => {
  //   let lenis: import("lenis").default | null = null;

  //   (async () => {
  //     const Lenis = (await import("lenis")).default;

  //     // Initialize Lenis
  //     lenis = new Lenis({
  //       // smooth: true, // Enables smooth scrolling
  //       duration: 3, // Duration of the smooth scroll effect
  //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  //       // direction: "vertical", // Scrolling direction (vertical/horizontal)
  //     });

  //     // Log scroll event for debugging
  //     lenis.on("scroll", (e) => {
  //       console.log("Scroll event:", e);
  //     });

  //     // Animation frame loop to ensure Lenis runs smoothly
  //     function raf(time: number) {
  //       lenis?.raf(time);
  //       requestAnimationFrame(raf);
  //     }

  //     requestAnimationFrame(raf);
  //   })();

  //   // Cleanup on component unmount
  //   return () => {
  //     if (lenis) lenis.destroy();
  //   };
  // }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: true,
        scroller: ".left-scroll-area",
        onEnter: () => {
          console.log("Entered section3");
          setSliderImages(generateSliderImagesForInterior());
        },
        onLeave: () => {
          console.log("Left section3");
          setIsImageChangeScroll((prev: boolean) => !prev);
        },
        onEnterBack: () => {
          console.log("Re-entering section3 from below");
          // setSliderImages([
          //   "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-open.jpg",
          //   "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-wardorbe.jpg",
          // ]);

          setSliderImages(generateSliderImagesForInterior());
        },
        onLeaveBack: () => {
          console.log("Leaving section3 from above");

          setIsImageChangeScroll((prev: boolean) => {
            console.log({ prev, currentModel, isMirrored });
            return !prev;
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentModel, isMirrored]);
  return (
    <div className="h-full left-scroll-area">
      {/* section 1 */}
      <section className="section section1">
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
      </section>

      {/* section 2 */}
      <section className="section" id="section2">
        <p className="text-[18px] mt-[120px]">Choose your finish</p>
        <div className={`flex justify-between max-w-[290px] mt-[17px]`}>
          {configuratorData.chooseYourFinish.map((d, i) => {
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
      </section>

      {/* section 3 */}
      <section className="section" id="section3">
        <p className="text-[18px] mt-[120px]">Choose your layout</p>
        {/* 16 inch */}
        {currentModel === "Space One" &&
          configuratorData.chooseYourLayoutFor16.map((d, i) => {
            return (
              <div
                onClick={() => {
                  const updatedData: ConfiguratorData = {
                    ...configuratorData,
                    chooseYourLayoutFor16:
                      configuratorData.chooseYourLayoutFor16.map((model) =>
                        model.name === d.name
                          ? { ...model, isSelected: true }
                          : { ...model, isSelected: false }
                      ),
                  };

                  setConfiguratorData(updatedData);
                }}
                key={i}
                className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
                style={{
                  borderColor: `${d.isSelected ? "#0096F7" : ""}`,
                }}
              >
                <div>
                  <p>{d.name}</p>
                  <p>{d.description}</p>
                </div>
                <div>From {formatNumberToCurrency(d.price)}</div>
              </div>
            );
          })}

        {/* 25 inch */}
        {currentModel === "Space One Plus" &&
          configuratorData.chooseYourLayoutFor25.map((d, i) => {
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
                    chooseYourLayoutFor25:
                      configuratorData.chooseYourLayoutFor25.map((model) =>
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
                <div>From {formatNumberToCurrency(d.price)}</div>
              </div>
            );
          })}

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[120px]">Optional upgrades</p>
        {configuratorData.optionalUpgradesForLayout.map((d, i) => {
          return (
            <div
              style={{
                borderColor: `${d.isSelected ? "#0096F7" : ""}`,
              }}
              onClick={() => {
                const updatedData: ConfiguratorData = {
                  ...configuratorData,
                  optionalUpgradesForLayout:
                    configuratorData.optionalUpgradesForLayout.map((model) => ({
                      ...model,
                      isSelected:
                        model.name === d.name ? !model.isSelected : false,
                    })),
                };

                setConfiguratorData(updatedData);
              }}
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
      </section>

      {/* section 4 */}
      <section className="section" id="section4">
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
              style={{
                borderColor: `${d.isSelected ? "#0096F7" : ""}`,
              }}
              onClick={() => {
                const updatedData: ConfiguratorData = {
                  ...configuratorData,
                  optionalUpgradesForEnergy:
                    configuratorData.optionalUpgradesForEnergy.map((model) => ({
                      ...model,
                      isSelected:
                        model.name === d.name ? !model.isSelected : false,
                    })),
                };

                setConfiguratorData(updatedData);
              }}
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
      </section>

      {/* final section 4 */}
      <div className="section" id="section5">
        <p className="text-[24px] mt-[120px]">Your configuration</p>
        <div className="h-[300px]"></div>
      </div>
    </div>
  );
};

export default Configurator;
