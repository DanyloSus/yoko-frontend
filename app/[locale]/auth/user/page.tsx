import UserContent from "@/components/users/Content";
import { useTranslations } from "next-intl";
import React from "react";
import { overkill } from "../../login/page";

const UserPage = () => {
  const t = useTranslations("User");

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
