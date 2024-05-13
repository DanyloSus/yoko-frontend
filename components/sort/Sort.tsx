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
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useSearchParams } from "next/navigation";
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";

type Text = {
  texts: {
    sort: string;
    views: string;
    likes: string;
    difficult: string;
  };
};

const Sort = ({ texts }: Text) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("sort", term);
    } else {
      params.delete("sort");
    }
    handleClose();
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleSearch("views")}>
          <ListItemIcon>
            <VisibilityOutlinedIcon />
          </ListItemIcon>
          {texts.views}
        </MenuItem>
        <MenuItem onClick={() => handleSearch("likes")}>
          <ListItemIcon>
            <ThumbUpAltOutlinedIcon />
          </ListItemIcon>
          {texts.likes}
        </MenuItem>
        <MenuItem onClick={() => handleSearch("difficult")}>
          <ListItemIcon>
            <AbcOutlinedIcon />
          </ListItemIcon>
          {texts.difficult}
        </MenuItem>
      </Menu>
      <div
        className="flex items-center justify-end gap-[10px] cursor-pointer"
        onClick={handleClick}
      >
        <p className="text-p">{texts.sort}</p>
        <FilterAltOutlinedIcon />
      </div>
    </div>
  );
};

export default Sort;
