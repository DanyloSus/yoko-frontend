"use client";

//import from libraries
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

//props for the active link
type NavLinkProps = {
  children: ReactNode;
  link: string;
  className?: string;
};

const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname();

  const mainWord =
    pathname.split("/").length > 1 ? pathname.split("/")[2] : pathname;

  const router = useRouter();

  console.log(props.link.split("/")[2] + " " + mainWord);

  return (
    <div
      className={
        (pathname === props.link ? "active" : "cursor-pointer") +
        `${props.className}`
      }
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
