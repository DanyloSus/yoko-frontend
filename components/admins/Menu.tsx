// external imports
import { useTranslations } from "next-intl";

// internal imports
import MenuTitle from "../../ui/MenuTitle";

const AdminMenu = () => {
  const t = useTranslations("AdminMenu"); // get translation

  return (
    <div className="max-md:hidden fixed top-0 left-0 flex flex-col z-10 bg-blue-marguerite-500 dark:bg-black text-white md:min-w-[338px] lg:min-w-[410px] border-r-2 border-blue-marguerite-700 dark:border-dark-grey h-screen pt-[70px]">
      <MenuTitle link="/admin/users" text={t("texts.users")} />
      <MenuTitle link="/admin/collections" text={t("texts.collections")} />
      <MenuTitle link="/admin/words" text={t("texts.words")} />
      <MenuTitle link="/admin/requests" text={t("texts.requests")} />
    </div>
  );
};

export default AdminMenu;
