import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[50px]">
      <div className="text-center ml-[40px] h-[100%] flex items-center ">
        <Image
          width={100}
          height={100}
          src={"/images/logo.svg"}
          alt="logo"
        ></Image>
      </div>
    </div>
  );
};

export default Navbar;
