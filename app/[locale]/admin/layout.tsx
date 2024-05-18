// external imports
import { ReactNode } from "react";

// internal imports
import AdminMenu from "@/components/admins/Menu";
import TranslatedHeader from "@/components/header/TranslatedHeader";

const AdminLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  return (
    <main className="dark:bg-black dark:text-white">
      <div className="">
        <TranslatedHeader locale={params.locale} />
        <div className="flex max-w-screen overflow-hidden w-full">
          <AdminMenu />
          <div className="pt-[80px] w-full relative overflow-x-auto h-screen  md:ml-[338px] lg:ml-[410px] flex-col flex gap-5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
