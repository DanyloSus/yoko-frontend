import Header from "@/components/Header";
import AdminMenu from "@/components/admins/Menu";
import React, { ReactNode } from "react";
import "./adminStyles.scss";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex pr-pc">
        <AdminMenu />
        <div className="pt-[70px] w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
