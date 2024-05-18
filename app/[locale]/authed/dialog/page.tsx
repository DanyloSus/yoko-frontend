// external imports
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import JustDialog from "@/components/ai/chat/JustDialog";
import { overkill } from "@/modules/internationalization/navigation";
import { aiTextsArray } from "@/modules/types/texts";

// create static metadata
export const metadata: Metadata = {
  title: "Dialog",
};

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
