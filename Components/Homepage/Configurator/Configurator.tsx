"use client";
import { formatNumberToCurrency } from "@/utils/functions";
import React from "react";

const Configurator = ({ configuratorData }) => {
  return (
    <div className="h-full">
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
              className="flex border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
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
        <div className="mt-[20px] flex flex-row justify-between max-w-[250px]">
          {configuratorData.chooseYourFinish.map((d, i) => {
            return (
              <div
                key={i}
                style={{ backgroundColor: d.color }}
                className={`cursor-pointer rounded-full w-[38.89px] h-[38.89px]`}
              ></div>
            );
          })}
        </div>

        {/* Choose your orientation */}
        <p className="text-[18px] mt-[120px]">Choose your orientation</p>
        {configuratorData.chooseYourOrientation.map((d, i) => {
          return (
            <div
              key={i}
              className=" border-2 justify-between p-4 rounded-xl mt-3 cursor-pointer"
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
