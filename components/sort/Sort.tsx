// useState needs CSR
"use client";

// external imports
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";

// internal imports
import SortElement from "./SortElement";

type Text = {
  texts: {
    sort: string;
    views: string;
    likes: string;
    difficult: string;
  };
};

const Sort = ({ texts }: Text) => {
  const [modal, setModal] = useState(false); // state for checking is modal open

  return (
    <div className="relative">
      {modal ? (
        <div className="absolute w-[184px] shadow-md bg-white py-[8px] rounded-[8px] bottom-[24px] right-0">
          <SortElement
            icon={<VisibilityOutlinedIcon />}
            value="views"
            text={texts.views}
            onClick={() => setModal(false)}
          />
          <SortElement
            icon={<ThumbUpAltOutlinedIcon />}
            value="likes"
            text={texts.likes}
            onClick={() => setModal(false)}
          />
          <SortElement
            icon={<AbcOutlinedIcon />}
            value="difficult"
            text={texts.difficult}
            onClick={() => setModal(false)}
          />
        </div>
      ) : null}
      <div
        className="flex items-center justify-end gap-[10px] cursor-pointer"
        onClick={() => setModal((value) => !value)}
      >
        <p className="text-p">{texts.sort}</p>
        <FilterAltOutlinedIcon />
      </div>
    </div>
  );
};

export default Sort;
