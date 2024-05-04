import React, { Suspense } from "react";
import AdminText from "./AdminText";
import { useTranslations } from "next-intl";

const ThanksPage = () => {
  const t = useTranslations("Thanks");

  return (
    <div className="flex flex-col items-center justify-center text-center absolute w-screen h-screen top-0 left-0 px-pc">
      <h1 className="text-h1">{t("heading")}</h1>
      <Suspense>
        <AdminText description={t("description")} />
      </Suspense>
    </div>
  );
};

export default ThanksPage;
