// external imports
import React, { ReactNode } from "react";

// internal imports
import "./adminStyles.scss";
import AdminMenu from "@/components/admins/Menu";
import TranslatedHeader from "@/components/header/TranslatedHeader";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/internationalization/navigation";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Admin");

  return (
    <>
      <div id="modal"></div>
      <div className="max-vsm:hidden">
        <TranslatedHeader />
        <div className="flex md:pr-tablet lg:pr-pc">
          <AdminMenu />
          <div className="pt-[70px] w-full relative h-screen">{children}</div>
        </div>
      </div>
      <div className="vsm:hidden px-phone absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full">
        <h3 className="text-h3">{t("phoneIssue")}</h3>
        <Link href="/authed/user">{t("back")}</Link>
      </div>
    </>
  );
};

export default AdminLayout;
