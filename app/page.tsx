import Configurator from "@/Components/Configurator/Configurator";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex h-[calc(100vh-50px)] justify-between">
        {/* images */}
        <div className="w-[70%] ">
          <Image
            width={1000}
            height={1000}
            className="w-full h-full"
            src="/images/d8047d733fc1779689db98378d6c3287.jpeg"
            alt=""
          />
        </div>

        {/* configurator */}
        <div className="w-[30%] overflow-scroll px-10">
          <Configurator />
        </div>
      </div>
    </div>
  );
};

export default page;
