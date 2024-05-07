// external imports
import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import WordsTable, { Word } from "@/components/admins/tables/WordsTable";

// create static metadata
export const metadata: Metadata = {
  title: "Words Page",
};

const UsersAdminPage = () => {
  const t = useTranslations("Admin"); // get page translation

  // // dummy data
  // const words: Word[] = [
  //   {
  //     EN: "Hello",
  //     UK: ["Вітаю", "Привіт"],
  //   },
  //   {
  //     EN: "New",
  //     UK: ["Новий"],
  //   },
  // ];

  return (
    <WordsTable
      texts={{
        en: t("words.en"),
        uk: t("words.uk"),
      }}
    />
  );
};

export default UsersAdminPage;
