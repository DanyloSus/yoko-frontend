// external imports
import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import { overkill } from "@/modules/internationalization/navigation";
import CollectionContent from "@/components/collections/CollectionContent";

// create static metadata
export const metadata: Metadata = {
  title: "Collection's name",
};

const CollectionPage = ({ params }: { params: { id: string } }) => {
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
        collectionId={params.id}
      />
    </>
  );
};

export default CollectionPage;
