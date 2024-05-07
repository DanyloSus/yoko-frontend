// usePatname needs CSR
"use client";

// external imports
import React, { ReactNode } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// internal imports
import { Link, usePathname } from "@/modules/internationalization/navigation";

const ExerciseLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="px-phone md:px-tablet lg:px-pc">
      <Link
        href={`/collection/${pathname.split("/")[2]}`}
        className="absolute left-phone md:left-tablet lg:left-pc top-[70px] cursor-pointer"
      >
        <ArrowBackIcon className=" w-[48px] h-[48px]" />
      </Link>
      <div className="pt-[40px] px-phone md:px-tablet lg:px-pc">{children}</div>
    </div>
  );
};

export default ExerciseLayout;
