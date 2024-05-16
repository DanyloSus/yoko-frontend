import WordForm from "@/components/forms/admins/WordForm";
import { overkill } from "@/modules/internationalization/navigation";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import React from "react";

// create static metadata
export const metadata: Metadata = {
  title: "Change word",
};

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
