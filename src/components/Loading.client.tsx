"use client";

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-white ${className}`}>
      <Player
        src="/LottieLego.json"
        loop
        autoplay
        className="w-40 h-40"
      />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Great things take time...
      </p>
    </div>
  );
};

export default Loading;