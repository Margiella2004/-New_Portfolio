import React from "react";
import imgScreenshot20251212At101636Pm1 from "figma:asset/13c23ad96d40c8ab565439ab313623391a80f732.png";
import { Hero } from "./components/Hero";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-[#6f3c59] selection:text-white flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <img alt="" className="w-full h-full object-cover opacity-60" src={imgScreenshot20251212At101636Pm1} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Hero />
      </div>
    </div>
  );
}
