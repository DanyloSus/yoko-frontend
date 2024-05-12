// external imports
import React from "react";

// internal imports
import MenuTitle from "./MenuTitle";

const AdminMenu = () => {
  return (
    <div className="max-md:hidden flex flex-col bg-blue-marguerite-500 dark:bg-black text-white md:min-w-[338px] lg:min-w-[410px] border-r-2 border-blue-marguerite-700 dark:border-dark-grey h-screen pt-[70px]">
      <MenuTitle link="/admin/users" text="Users" />
      <MenuTitle link="/admin/collections" text="Collections" />
      <MenuTitle link="/admin/words" text="Words" />
      <MenuTitle link="/admin/requests" text="Requests" />
    </div>
  );
};

export default AdminMenu;
