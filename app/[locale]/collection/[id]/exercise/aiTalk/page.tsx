import ThemeDialog from "@/components/ai/chat/ThemeDialog";
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
