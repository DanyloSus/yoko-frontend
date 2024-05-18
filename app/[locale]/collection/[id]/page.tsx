// external imports
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import CollectionContent from "@/components/collections/collection/CollectionContent";
import { overkill } from "@/modules/internationalization/navigation";

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
            "texts.comments",
            "texts.addComment",
            "texts.submit",
            "texts.error",
          ],
          t
        )}
        errors={overkill(["errors.required", "errors.minLen"], t)}
        collectionId={params.id}
      />
    </>
  );
};

export default CollectionPage;
