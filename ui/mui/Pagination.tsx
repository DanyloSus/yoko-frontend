// styled needs CSR
"use client";

// external imports
import Pagination, { PaginationProps } from "@mui/material/Pagination";

// custom component
const StyledPagination = ({ className, ...props }: PaginationProps) => {
  return (
    <div className="bg-white dark:bg-black mx-auto">
      <Pagination {...props} />
    </div>
  );
};

export default StyledPagination;
