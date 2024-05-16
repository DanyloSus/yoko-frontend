// use pathname needs CSR
"use client";

// external imports
import React, { ReactNode } from "react";

// internal imports
import { Link, usePathname } from "@/modules/internationalization/navigation";

//props for the nav link
type NavLinkProps = {
  children: ReactNode;
  link: string; // the best way start link with /
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
