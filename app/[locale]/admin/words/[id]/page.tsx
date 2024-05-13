import WordForm from "@/components/admins/forms/WordForm";
import React from "react";

const WordPage = ({ params }: { params: { id: string } }) => {
  return <WordForm params={params} />;
};

export default WordPage;
