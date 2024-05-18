// external imports
import { useTranslations } from "next-intl";

// internal imports
import ThemeDialog from "@/components/ai/chat/ThemeDialog";
import { overkill } from "@/modules/internationalization/navigation";
import { aiTextsArray } from "@/modules/types/texts";

const DialogWithAIPage = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("AI"); // get page translation

  return (
    <ThemeDialog
      params={params}
      texts={overkill(aiTextsArray, t)}
      errors={{ required: t("errors.required") }}
    />
  );
};

export default DialogWithAIPage;
