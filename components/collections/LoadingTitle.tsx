"use client";

import React from "react";

type LoadingTitleProps = {
  className?: string;
};

const LoadingTitle = (props: LoadingTitleProps) => {
  return (
    <div
      className={
        props.className +
        " bg-gradient-to-br from-white dark:from-black from-40% via-black dark:via-white via-50% to-white to-60% dark:to-black"
      }
      style={{
        backgroundSize: "200% 200%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default LoadingTitle;
