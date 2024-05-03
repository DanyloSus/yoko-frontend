import React, { ReactNode } from "react";

type CellProps = {
  children?: ReactNode;
  isMarked?: boolean;
};

const Cell = (props: CellProps) => {
  return (
    <div
      className="w-full h-[80px] border border-dark-grey text-center"
      style={{
        backgroundColor: props.isMarked ? "#F0F0FD" : "white",
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
