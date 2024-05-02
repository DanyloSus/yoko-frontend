"use client";

//import from libraries
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

//props for the active link
type NavLinkProps = {
  children: ReactNode;
  link: string;
};

const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname().split("/")[2];

  const router = useRouter();

  return (
    <div
      className={
        pathname === props.link.split("/")[2] ? "active" : "cursor-pointer"
      }
      onClick={() => {
        //go to another page
        router.replace(props.link);
      }}
    >
      {props.children}
    </div>
  );
};

export default NavLink;
