"use client";
import React from "react";

export function AnimatedButton(children: React.ReactNode) {
  return (
    <div className="flex items-center justify-center z-51">
      <button className="px-4 py-2 rounded-md text-black dark:text-black text-center relative overflow-hidden dark:bg-white dark:text-black text-white flex justify-center group/modal-btn dark:hover:bg-[#4be961]">
        {children}
      </button>
    </div>
  );
}
