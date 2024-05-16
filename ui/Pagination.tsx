// styled needs CSR
"use client";

// external imports
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

// create custom Pagination's style
const StyleForPagination = styled(Pagination)<PaginationProps>(({ theme }) => ({
  // applying base style
}));

import React from "react";

const StyledPagination = ({ className, ...props }: PaginationProps) => {
  return (
    <div className="bg-white dark:bg-black mx-auto">
      <StyleForPagination {...props} />
    </div>
  );
};

export default StyledPagination;
