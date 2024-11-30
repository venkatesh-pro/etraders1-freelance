"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import Configurator from "./Configurator/Configurator";
import { data } from "@/data";

const HomePage = () => {
  const [configuratorData] = useState(data);

  const [sliderImages] = useState([
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-1.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-2.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-3.jpg",
    "/ConfiguratorImages/BLACK COMPRESSED 16:25/16-black-4.jpg",
  ]);

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
          <Configurator configuratorData={configuratorData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
