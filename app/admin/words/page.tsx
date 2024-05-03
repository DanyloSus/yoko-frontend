import WordsTable, { Word } from "@/components/admins/tables/WordsTable";
import React from "react";

const UsersAdminPage = () => {
  const words: Word[] = [
    {
      EN: "Hello",
      UK: ["Вітаю", "Привіт"],
    },
    {
      EN: "New",
      UK: ["Новий"],
    },
  ];

  return <WordsTable words={words} />;
};

export default UsersAdminPage;
