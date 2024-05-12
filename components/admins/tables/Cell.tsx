// external imports
import React, { ReactNode } from "react";

type CellProps = {
  children?: ReactNode;
  isMarked?: boolean;
};

const Cell = (props: CellProps) => {
  return (
    <div
      className={
        (props.isMarked ? "bg-[#F0F0FD]" : "bg-white") +
        "w-full dark:bg-black overflow-hidden h-[80px] border border-dark-grey text-center"
      }
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="line-clamp-3 text-ellipsis">
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Cell;
