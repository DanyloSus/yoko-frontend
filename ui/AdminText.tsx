// useSearchParams needs CSR
"use client";

// external imports
import { useSearchParams } from "next/navigation";

// client side text
const AdminText = ({ description }: { description: string }) => {
  const searchParams = useSearchParams(); // hook for searching params

  const is = searchParams.get("is"); // searching value of "is" param

  return is === "pending" ? <p>{description}</p> : null;
};

export default AdminText;
