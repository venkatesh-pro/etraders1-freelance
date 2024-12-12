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

  const fadeOutImages = (onComplete?: () => void) => {
    gsap.to(".slider .list .item img", {
      duration: 0.2,
      opacity: 0,
      onComplete,
    });
  };

  const fadeInImages = () => {
    requestAnimationFrame(() => {
      gsap.fromTo(
        ".slider .list .item img",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        start: "top center",
        end: "bottom center",
        scrub: true,
        // markers: true,
        scroller: ".left-scroll-area",
        onEnter: () => {
          console.log("Entered section3");
          // setSliderImages(generateSliderImagesForInterior());

          fadeOutImages(() => {
            setSliderImages(generateSliderImagesForInterior());
            fadeInImages();
          });
        },
        onLeave: () => {
          console.log("Left section3");
          // setIsImageChangeScroll((prev: boolean) => !prev);
          fadeOutImages(() => {
            setIsImageChangeScroll((prev: boolean) => !prev);
            // If this causes a new image set, fade them in after
            fadeInImages();
          });
        },
        onEnterBack: () => {
          console.log("Re-entering section3 from below");
          // setSliderImages([
          //   "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-open.jpg",
          //   "/ConfiguratorImages/INTERIOR COMPRESSED 16:25/16-wardorbe.jpg",
          // ]);

          // setSliderImages(generateSliderImagesForInterior());
          fadeOutImages(() => {
            setSliderImages(generateSliderImagesForInterior());
            fadeInImages();
          });
        },
        onLeaveBack: () => {
          console.log("Leaving section3 from above");

          // setIsImageChangeScroll((prev: boolean) => {
          //   console.log({ prev, currentModel, isMirrored });
          //   return !prev;
          // });

          fadeOutImages(() => {
            setIsImageChangeScroll((prev: boolean) => {
              console.log({ prev, currentModel, isMirrored });
              return !prev;
            });
            fadeInImages();
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [currentModel, isMirrored]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Iterate through each key in the data object
    for (const key of Object.keys(configuratorData) as Array<
      keyof ConfiguratorData
    >) {
      if (Array.isArray(configuratorData[key])) {
        // Filter for items where `isSelected` is true and have a `price` property
        const selectedItems = configuratorData[key].filter(
          (item) =>
            item.isSelected && "price" in item && typeof item.price === "number"
        );

        // Add their prices to the total
        selectedItems.forEach((item) => {
          totalPrice += (item as { price: number }).price;
        });
      }
    }

    return totalPrice;
  };

  return (
    <div className="h-full left-scroll-ara">
      {/* section 1 */}
      <section className="section section1">
        <h1 className="text-[40px]">Space One</h1>
        <p className="text-[#808080] mt-[20px]">
          Configure your Space One design. Choose a layout, pick your cladding
          colour, and optional accessories.
        </p>
        <p className="text-[18px] mt-[60px] md:mt-[120px]">Choose your model</p>
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
                <p className="font-bold text-[18px]">{d.name}</p>
                <p className="text-[#808080] text-[12px]">{d.length}</p>
              </div>
              <div>From {formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}
      </section>

      {/* section 2 */}
      <section className="section" id="section2">
        <p className="text-[18px] mt-[60px] md:mt-[120px]">
          Choose your finish
        </p>
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
                {d.isSelected && (
                  <p className="mt-2 text-sm text-center capitalize">
                    {d.name.charAt(0).toUpperCase() +
                      d.name.slice(1).toLowerCase()}
                  </p>
                )}

                {/* <p className="mt-2 text-sm text-center capitalize">{d.name}</p> */}
                {/* <p className="text-sm text-center">${data.price}</p> */}
              </div>
            );
          })}
        </div>

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[60px] md:mt-[120px]">
          Choose your orientation
        </p>
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
              <p className="font-bold text-[18px]">{d.name}</p>
              <p className="text-[#808080] text-[12px]">{d.description}</p>
            </div>
          );
        })}
      </section>

      {/* section 3 */}
      <section className="section" id="section3">
        <p className="text-[18px] mt-[60px] md:mt-[120px]">
          Choose your layout
        </p>
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
                  {/* <p>{d.name}</p>
                  <p>{d.description}</p> */}

                  <p className="font-bold text-[18px]">{d.name}</p>
                  <p className="text-[#808080] text-[12px]">{d.description}</p>
                </div>
                {d?.price > 0 && <div>{formatNumberToCurrency(d.price)}</div>}
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
                  {/* <p>{d.name}</p>
                  <p>{d.description}</p> */}

                  <p className="font-bold text-[18px]">{d.name}</p>
                  <p className="text-[#808080] text-[12px]">{d.description}</p>
                </div>
                {d?.price > 0 && (
                  <div>From {formatNumberToCurrency(d.price)}</div>
                )}
              </div>
            );
          })}

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[60px] md:mt-[120px]">Optional upgrades</p>
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
                <p className="font-bold text-[18px]">{d.name}</p>
                <p className="text-[#808080] text-[12px]">{d.description}</p>
              </div>
              {d.price > 0 && <div>From {formatNumberToCurrency(d.price)}</div>}
            </div>
          );
        })}
      </section>

      {/* section 4 */}
      <section className="section" id="section4">
        <p className="text-[18px] mt-[60px] md:mt-[120px]">
          Choose your energy
        </p>
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
                <p className="font-bold text-[18px]">{d.name}</p>
                <p className="text-[#808080] text-[12px]">{d.description}</p>
              </div>
              {(d.price ?? 0) > 0 && (
                <div>{formatNumberToCurrency(d?.price ?? 0)}</div>
              )}
            </div>
          );
        })}

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[60px] md:mt-[120px]">Optional upgrades</p>
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
                <p className="font-bold text-[18px]">{d.name}</p>
                <p className="text-[#808080] text-[12px]">{d.description}</p>
              </div>
              <div>{formatNumberToCurrency(d.price)}</div>
            </div>
          );
        })}
      </section>

      {/* final section 5 */}
      <section className="section" id="section5">
        <p className="mt-[60px] md:mt-[120px] text-[30px]">
          Your configuration
        </p>
        <div className="mt-[20px]">
          <p className="text-[14px] text-[#808080]">Space One</p>
          <p>
            {configuratorData.chooseYourModel.find((d) => d.isSelected)?.length}
          </p>
        </div>
        <hr className="mt-[13px] h-[1.5px] bg-[#CCCCCCCC]" />
        <div className="mt-[15px] flex justify-between items-center">
          <div>
            <p className="text-[14px] text-[#808080]">Color</p>
            <p>
              {
                configuratorData.chooseYourFinish.find((d) => d.isSelected)
                  ?.name
              }
            </p>
          </div>
          <div>
            <div
              className={` flex items-center justify-center p-1 border-2 border-transparent`}
            >
              <div
                className={` w-[38.89px] h-[38.89px] rounded-full`}
                style={{
                  background: configuratorData.chooseYourFinish.find(
                    (d) => d.isSelected
                  )?.color,
                }}
              ></div>
            </div>
          </div>
        </div>
        <hr className="mt-[13px] h-[1.5px] bg-[#CCCCCCCC]" />
        <div className="mt-[15px] flex justify-between items-center">
          <div>
            <p className="text-[14px] text-[#808080]">Layout</p>
            <p>
              {currentModel === "Space One Plus"
                ? configuratorData.chooseYourLayoutFor25.find(
                    (d) => d.isSelected
                  )?.name
                : configuratorData.chooseYourLayoutFor16.find(
                    (d) => d.isSelected
                  )?.name}
            </p>
            <p>
              {currentModel === "Space One Plus"
                ? configuratorData.chooseYourLayoutFor25.find(
                    (d) => d.isSelected
                  )?.description
                : configuratorData.chooseYourLayoutFor16.find(
                    (d) => d.isSelected
                  )?.description}
            </p>
          </div>
        </div>
        {/* energy */}
        <hr className="mt-[13px] h-[1.5px] bg-[#CCCCCCCC]" />
        <div className="mt-[15px] flex justify-between items-center">
          <div>
            <p className="text-[14px] text-[#808080]">Energy</p>
            <p>
              {
                configuratorData.chooseYourEnergy.find((d) => d.isSelected)
                  ?.name
              }
            </p>
          </div>
        </div>
        {/* Upgrades */}
        <hr className="mt-[13px] h-[1.5px] bg-[#CCCCCCCC]" />
        <div className="mt-[15px] flex justify-between items-center">
          <div>
            <p className="text-[14px] text-[#808080]">Upgrades</p>
            <p>
              {
                configuratorData.optionalUpgradesForLayout.find(
                  (d) => d.isSelected
                )?.name
              }
            </p>
            <p>
              {
                configuratorData.optionalUpgradesForEnergy.find(
                  (d) => d.isSelected
                )?.name
              }
            </p>
          </div>
        </div>
        {/* unit configured */}
        <hr className="mt-[80px] h-[1.5px] bg-[#CCCCCCCC]" />
        <div className="mt-[20px] flex justify-between">
          <div className="w-[65%]">
            <p>Unit as configured</p>
            <p className="text-[14px] text-[#808080] mt-[16px]">
              Excludes delivery, permitting, and on-site installation.
            </p>
          </div>
          <div>{formatNumberToCurrency(calculateTotalPrice())}</div>
        </div>
        <button className="mt-[50px] w-full p-3 text-white rounded-lg bg-[#0096F7]">
          Continue
        </button>
      </section>

      {/* empty space */}
      <div className="h-[120px] md:h-[200px] ">
        {/* <div>
          {JSON.stringify(
            configuratorData.chooseYourModel.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.chooseYourFinish.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.chooseYourOrientation.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.chooseYourLayoutFor16.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.chooseYourLayoutFor25.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.optionalUpgradesForLayout.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.chooseYourEnergy.find((d) => d.isSelected)
          )}
          {JSON.stringify(
            configuratorData.optionalUpgradesForEnergy.find((d) => d.isSelected)
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Configurator;
