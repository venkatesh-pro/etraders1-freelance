import Configurator from "@/Components/Configurator/Configurator";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex h-[calc(100vh-50px)] justify-between">
        {/* images */}
        <div className="w-[70%] ">
          <img
            className="w-full h-full"
            src="https://s3-alpha-sig.figma.com/img/091b/024f/d8047d733fc1779689db98378d6c3287?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZVzBmepnocgEXpMmXLFErx2PuWR8~0gl-fHQCteSGSz13exQdeChmzC9dCyO2t1e1cE-7NelTisGLPJryDkHMBnqC0a1P69ZkDxQtSre1pjorj1osJv0FMZa4t5YC-QCsqR1StWD5mNHWCPFjrmc0fLCQ1fuQhV34zHf82kxJmwL6EBbJ20gBDtaYxrsIYUdFkW75WAY9nPoMcrtPtZBOQWsMOabVAjmzqpl6vjjKAsMLBV4kSsDYDx3zctymizaTC~VSTmbWs8r3LDyBsJ8pyYeALTlMGj8eniPg2t9s770DhlTuAZMzrzBm9VGu79pswyb-wN28zTGD6thmndLEA__"
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
