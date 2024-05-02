"use client";

import React, { ReactNode } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ExerciseLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="px-pc">
      <Link
        href={`/collection/${pathname.split("/")[2]}`}
        className="absolute left-pc top-[70px] cursor-pointer"
      >
        <ArrowBackIcon className=" w-[48px] h-[48px]" />
      </Link>
      <div className="pt-[40px]">{children}</div>
    </div>
  );
};

export default ExerciseLayout;
