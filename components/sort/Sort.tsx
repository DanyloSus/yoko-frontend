"use client";

import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import SortElement from "./SortElement";

const Sort = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="relative">
      {modal ? (
        <div className="absolute w-[184px] shadow-md bg-white py-[8px] rounded-[8px] bottom-[24px] right-0">
          <SortElement
            icon={<VisibilityOutlinedIcon />}
            value="views"
            text="By views"
            onClick={() => setModal(false)}
          />
          <SortElement
            icon={<ThumbUpAltOutlinedIcon />}
            value="likes"
            text="By likes"
            onClick={() => setModal(false)}
          />
          <SortElement
            icon={<AbcOutlinedIcon />}
            value="difficult"
            text="By difficult"
            onClick={() => setModal(false)}
          />
        </div>
      ) : null}
      <div
        className="flex items-center justify-end gap-[10px] cursor-pointer"
        onClick={() => setModal((value) => !value)}
      >
        <p className="text-p">Sort</p>
        <FilterAltOutlinedIcon />
      </div>
    </div>
  );
};

export default Sort;
