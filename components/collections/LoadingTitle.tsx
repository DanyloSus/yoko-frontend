"use client";

import { Store } from "@/modules/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type LoadingTitleProps = {
  className?: string;
};

const LoadingTitle = (props: LoadingTitleProps) => {
  const isDark = useSelector((state: Store) => state.theme) == "dark";

  const bgColor = isDark ? "#141301" : "#FFFBFC";
  const accentColor = isDark ? "#B5B2B3" : "#B5B2B3";

  return (
    <div
      className={props.className}
      style={{
        background: `linear-gradient(to bottom right, ${bgColor} 40%, ${accentColor} 50%, ${bgColor} 60%)`,
        backgroundSize: "200% 200%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default LoadingTitle;
