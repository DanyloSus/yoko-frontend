import NavLink from "@/components/NavLink";
import Sort from "@/components/sort/Sort";
import StyledButton from "@/ui/Button";
import Link from "next/link";
import React from "react";

const Store = () => {
  return (
    <div className="w-full flex flex-col gap-[24px] relative">
      <div className="absolute top-0 right-0">
        <NavLink link="store/add">
          <StyledButton variant="contained">Add</StyledButton>
        </NavLink>
      </div>
      <h1 className="text-h1 text-center">Store</h1>
      <Sort />
      <div className="grid gap-[20px] grid-cols-4">
        <Link
          href="/collection/1"
          className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500"
        />
        <Link
          href="/collection/1"
          className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500"
        />
        <Link
          href="/collection/1"
          className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500"
        />
        <Link
          href="/collection/1"
          className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500"
        />
        <Link
          href="/collection/1"
          className="max-w-[280px] w-full h-[200px] bg-blue-marguerite-500"
        />
      </div>
    </div>
  );
};

export default Store;
