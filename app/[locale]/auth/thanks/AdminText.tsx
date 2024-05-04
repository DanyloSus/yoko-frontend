"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const AdminText = ({ description }: { description: string }) => {
  const searchParams = useSearchParams();

  const is = searchParams.get("is");

  return is === "pending" ? <p>{description}</p> : null;
};

export default AdminText;
