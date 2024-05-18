// hooks need CSR
"use client";

// external imports
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// internal imports
import { useRouter } from "@/modules/internationalization/navigation";
import StyledTextField from "@/ui/mui/TextField";

type SearchText = {
  text: { text: string };
};

const Search = ({ text }: SearchText) => {
  // hook to find params query
  const searchParams = useSearchParams();
  // get pathname
  const pathname = usePathname();
  // router for changing page by code
  const router = useRouter();

  // function for setting search query every 0.3s
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <StyledTextField
      placeholder={text.text}
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
