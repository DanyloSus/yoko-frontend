// external imports
import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import AdminText from "./AdminText";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("thanks.title"),
  };
}

const ThanksPage = () => {
  const t = useTranslations("Thanks"); // get page translation

  return (
    <div className="flex flex-col items-center justify-center text-center absolute w-screen h-screen top-0 left-0  px-phone sm:px-tablet md:px-pc">
      <h1 className="text-h2 sm:text-h1">{t("heading")}</h1>
      {/* work with query needs Suspens */}
      <Suspense>
        <AdminText description={t("description")} />
      </Suspense>
    </div>
  );
};

export default ThanksPage;
