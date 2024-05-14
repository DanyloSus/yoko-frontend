"use client";

import StyledTextField from "@/ui/TextField";
import { InputAdornment } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <StyledTextField
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon className="text-black dark:text-white" />
          </InputAdornment>
        ),
        sx: { borderRadius: "9999px" },
      }}
      className="w-full"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
};

export default Search;
