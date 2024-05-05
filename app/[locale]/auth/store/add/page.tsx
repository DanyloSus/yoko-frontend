// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import CreateStore from "@/components/forms/addCollection/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("addCollection.title"),
    descriptions: t("addCollection.description"),
  };
}

const AddCollectionPage = () => {
  const t = useTranslations("AddCollection"); // get page translation

  return (
    <div className="w-full flex flex-col gap-[24px] text-center">
      <h1 className="text-h1 leading-[96px]">{t("heading")}</h1>
      <FormWrapper isDark>
        <CreateStore
          errors={overkill(["errors.nameRequired", "errors.textRequired"], t)}
          texts={overkill(
            [
              "texts.name",
              "texts.text",
              "texts.private",
              "texts.cancel",
              "texts.post",
            ],
            t
          )}
        />
      </FormWrapper>
    </div>
  );
};

export default AddCollectionPage;
