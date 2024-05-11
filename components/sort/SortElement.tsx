// hooks needs CSR
"use client";

// external imports
import React, { ReactNode } from "react";

// internal imports
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";

type SortElementProps = {
  icon: ReactNode;
  text: string;
  value: string;
  onClick: () => void;
};

const SortElement = (props: SortElementProps) => {
  // router for changing page by code
  const router = useRouter();
  // pathname to get pathname
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-[10px] hover:bg-light-grey px-[8px] cursor-pointer"
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
