"use client";

//import from libraries
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/modules/internationalization/navigation";

//props for the active link
type NavLinkProps = {
  children: ReactNode;
  link: string;
};

const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname().split("/")[2];

  return (
    <Link
      className={
        pathname === props.link.split("/")[2] ? "active" : "cursor-pointer"
      }
      href={props.link}
    >
      {props.children}
    </Link>
  );
};

export default NavLink;
