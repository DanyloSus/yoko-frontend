// external imports
import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import CollectionContent from "@/components/collections/CollectionContent";
import { overkill } from "@/modules/internationalization/navigation";

// create static metadata
export const metadata: Metadata = {
  title: "Collection's name",
};

const CollectionPage = () => {
  const t = useTranslations("Collection"); // get page translation

  return (
    <>
      <CollectionContent
        texts={overkill(
          [
            "texts.start",
            "texts.likes",
            "texts.views",
            "texts.propositionHeading",
            "texts.textExercise",
            "texts.quizExercise",
            "texts.cardsExercise",
          ],
          t
        )}
      />
    </>
  );
};

export default CollectionPage;
