// external imports
import React, { ReactNode } from "react";

// internal imports
import "./adminStyles.scss";
import AdminMenu from "@/components/admins/Menu";
import TranslatedHeader from "@/components/header/TranslatedHeader";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TranslatedHeader />
      <div className="flex pr-pc">
        <AdminMenu />
        <div className="pt-[70px] w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
