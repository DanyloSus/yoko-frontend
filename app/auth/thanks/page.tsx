"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ThanksPage = () => {
  const searchParams = useSearchParams();

  const is = searchParams.get("is");

  return (
    <div className="flex flex-col items-center justify-center text-center absolute w-screen h-screen top-0 left-0 px-pc">
      <h1 className="text-h1">Thanks for Your Collection</h1>
      {is === "pending" ? (
        <p>Administration will check your collection.</p>
      ) : null}
    </div>
  );
};

export default ThanksPage;
