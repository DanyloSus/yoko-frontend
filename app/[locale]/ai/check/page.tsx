import CheckLevelContent from "@/components/ai/CheckLevelContent";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";

export const aiTextsArray = [
  "texts.message",
  "texts.startDialog",
  "texts.stop",
  "texts.send",
  "texts.hint",
  "texts.placeholder",
  "texts.ai",
  "texts.you",
];

const CheckLevelPage = () => {
  const t = useTranslations("AI");

  return (
    <CheckLevelContent
      errors={{
        required: t(["errors.required"]),
      }}
      texts={overkill(aiTextsArray, t)}
    />
  );
};

export default CheckLevelPage;
