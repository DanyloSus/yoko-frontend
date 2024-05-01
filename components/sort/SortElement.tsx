"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type SortElementProps = {
  icon: ReactNode;
  text: string;
  value: string;
  onClick: () => void;
};

const SortElement = (props: SortElementProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-[10px] bg-white hover:bg-light-grey px-[8px] cursor-pointer"
      onClick={() => {
        props.onClick();
        router.push(`${pathname}?${props.value}`);
      }}
    >
      {props.icon}
      <p>{props.text}</p>
    </div>
  );
};

export default SortElement;
