// external imports
import { useTranslations } from "next-intl";

// internal imports
import CheckLevelContent from "@/components/ai/CheckLevelContent";
import { overkill } from "@/modules/internationalization/navigation";
import { aiTextsArray } from "@/modules/types/texts";

const CheckLevelPage = () => {
  const t = useTranslations("AI"); // get page translation

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
