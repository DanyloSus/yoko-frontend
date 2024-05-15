import WordForm from "@/components/admins/forms/WordForm";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const WordPage = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("Admin"); // get page translation

  return (
    <WordForm
      texts={overkill(
        [
          "wordForm.wordReq",
          "wordForm.transReq",
          "wordForm.update",
          "wordForm.word",
          "wordForm.ukTranslation",
          "wordForm.submit",
        ],
        t
      )}
      params={params}
    />
  );
};

export default WordPage;
