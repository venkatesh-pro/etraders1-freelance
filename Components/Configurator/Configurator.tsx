import React from "react";

const Configurator = () => {
  return (
    <div className="  h-full">
      <h1 className="text-[40px]">Space One</h1>
      <p className="text-[#808080] mt-[20px]">
        Configure your Space One design. Choose a layout, pick your cladding
        colour, and optional accessories.
      </p>
      <p className="text-[18px] mt-[120px]">Choose your model</p>
      <div className="flex border-2 justify-between p-4 rounded-xl mt-3">
        <div>
          <p>Space One</p>
          <p>16 square metres</p>
        </div>
        <div>From $64,000</div>
      </div>
      <div className="flex border-2 justify-between p-4 rounded-xl mt-3">
        <div>
          <p>Space One</p>
          <p>16 square metres</p>
        </div>
        <div>From $64,000</div>
      </div>
    </div>
  );
};

export default Configurator;
