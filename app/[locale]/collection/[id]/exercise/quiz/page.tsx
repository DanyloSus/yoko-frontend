// external imports
import React from "react";
import { getTranslations } from "next-intl/server";

// internal imports
import TestComponent from "@/components/exercises/TestComponent";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("exercises.quiz.title"),
  };
}

const QuizExercise = ({ params }: { params: { id: string } }) => {
  // const englishText = ["I", "love", "learning", "new", "languages."]; // dummy data
  // const ukrainianText = ["Я", "люблю", "вивчати", "нові", "мови."]; // dummy data

  return (
    <div>
      <TestComponent collectionId={params.id} />
    </div>
  );
};

export default QuizExercise;
