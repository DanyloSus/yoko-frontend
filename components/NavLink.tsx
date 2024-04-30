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
  const pathname = usePathname();

  const router = useRouter();

  return (
    <div
      className={pathname === props.link ? "active" : "cursor-pointer"}
      onClick={() => {
        //go to another page
        router.push(props.link);
      }}
    >
      {props.children}
    </div>
  );
};

export default NavLink;
