import { overkill } from "@/app/[locale]/login/page";
import CreateStore from "@/components/forms/CreateStore";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";

const AddCollectionPage = () => {
  const t = useTranslations("AddCollection");

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
