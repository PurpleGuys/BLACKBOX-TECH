"use client";

import { Html } from "@react-three/drei";

export function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Html>
  );
}