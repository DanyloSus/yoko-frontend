import JustDialog from "@/components/ai/dialog/JustDialog";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { aiTextsArray } from "../../ai/check/page";

const DialogPage = () => {
  const t = useTranslations("AI");

  return (
    <JustDialog
      texts={overkill(aiTextsArray, t)}
      errors={{ required: t("errors.required") }}
    />
  );
};

export default DialogPage;
