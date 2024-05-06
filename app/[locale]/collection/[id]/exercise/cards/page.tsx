// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import CardComponents from "@/components/exercises/CardComponents";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("exercises.cards.title"),
  };
}

const CardExercise = () => {
  const t = useTranslations("Exercises"); // get page translation

  const englishText = ["I", "love", "learning", "new", "languages."]; // dummy data
  const ukrainianText = ["Я", "люблю", "вивчати", "нові", "мови."]; // dummy data

  return (
    <CardComponents
      texts={overkill(["cards.save", "cards.translate", "cards.back"], t)}
      englishText={englishText}
      ukrainianText={ukrainianText}
    />
  );
};

export default CardExercise;
