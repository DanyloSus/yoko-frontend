// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import TranslationBubble from "@/components/exercises/TranslationBubble";
import TextContent from "@/components/exercises/TextContent";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("exercises.text.title"),
  };
}

const TextExercise = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("Exercises"); // get page translation

  return <TextContent collectionId={params.id} />;
};

export default TextExercise;
