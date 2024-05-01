import Sort from "@/components/sort/Sort";
import React from "react";

const Collections = () => {
  return (
    <div className="w-full flex flex-col gap-[24px]">
      <h1 className="text-h1 text-center">Collections</h1>
      <Sort />
      <div className="grid gap-4 grid-cols-4">
        <div className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500" />
        <div className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500" />
        <div className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500" />
        <div className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500" />
        <div className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500" />
      </div>
    </div>
  );
};

export default Collections;
