import { aiTextsArray } from "@/app/[locale]/ai/check/page";
import ThemeDialog from "@/components/ai/dialog/ThemeDialog";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const DialogWithAIPage = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("AI");

  return (
    <ThemeDialog
      params={params}
      texts={overkill(aiTextsArray, t)}
      errors={{ required: t("errors.required") }}
    />
  );
};

export default DialogWithAIPage;
