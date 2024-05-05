// external imports
import React from "react";

// internal imports
import MenuTitle from "./MenuTitle";

const AdminMenu = () => {
  return (
    <div className="flex flex-col bg-blue-marguerite-500 text-white min-w-[410px] border-r-2 border-blue-marguerite-700 h-screen pt-[70px]">
      <MenuTitle link="/admin/users" text="Users" />
      <MenuTitle link="/admin/collections" text="Collections" />
      <MenuTitle link="/admin/words" text="Words" />
    </div>
  );
};

export default AdminMenu;
