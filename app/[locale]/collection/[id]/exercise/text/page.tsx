// external imports
import { getTranslations } from "next-intl/server";

// internal imports
import TextContent from "@/components/exercises/TextContent";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" }); // get translation for metadata

  return {
    title: t("exercises.text.title"), // set title
  };
}

const TextExercise = ({ params }: { params: { id: string } }) => {
  return <TextContent collectionId={params.id} />;
};

export default TextExercise;
