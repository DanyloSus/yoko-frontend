// useSearchParams needs CSR
"use client";

// external imports
import React from "react";
import { useSearchParams } from "next/navigation";

const AdminText = ({ description }: { description: string }) => {
  const searchParams = useSearchParams(); // hook for searching params

  const is = searchParams.get("is"); // searching value of "is" param

  return is === "pending" ? <p>{description}</p> : null;
};

export default AdminText;
