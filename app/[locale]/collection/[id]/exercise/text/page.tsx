// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import TranslationBubble from "@/components/exercises/TranslationBubble";

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

const TextExercise = () => {
  const t = useTranslations("Exercises"); // get page translation

  return (
    <div className="text-center flex flex-col gap-[24px]">
      <h1 className="text-h3 sm:text-h1  mt-[40px]">
        English to Ukrainian Translation
      </h1>
      <TranslationBubble
        bubbleText={t("text.bubbleText")}
        englishText={["I", "love", "learning", "new", "languages."]} // dummy data
        ukrainianText={["Я", "люблю", "вивчати", "нові", "мови."]} // dummy data
      />
    </div>
  );
};

export default TextExercise;
