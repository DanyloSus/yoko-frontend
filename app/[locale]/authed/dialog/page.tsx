import JustDialog from "@/components/ai/chat/JustDialog";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const aiTextsArray = [
  "texts.message",
  "texts.startDialog",
  "texts.stop",
  "texts.send",
  "texts.hint",
  "texts.placeholder",
  "texts.ai",
  "texts.you",
];

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
