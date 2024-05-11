// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import { overkill } from "@/modules/internationalization/navigation";
import UserContent from "@/components/users/Content";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("user.title"),
  };
}

const UserPage = () => {
  const t = useTranslations("User"); // get page translation

  return (
    <UserContent
      texts={overkill(
        ["texts.collections", "texts.settings", "texts.admin", "texts.exit"],
        t
      )}
    />
  );
};

export default UserPage;
