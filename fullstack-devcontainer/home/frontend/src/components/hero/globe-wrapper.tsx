"use client";

import Particles from "@/components/hero/particles";
import Globe from "@/components/hero/globe-source";

export default function GlobeAndStars() {
  return (
    <div className="w-full h-full">
    <Particles className="absolute inset-0 z-1" quantity={150} ease={80} color={"#808080"} refresh />
    <Globe className="absolute inset-0 z-2" />
  </div>
  );
}