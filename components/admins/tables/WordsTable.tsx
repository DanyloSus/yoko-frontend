"use client";

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Cell from "./Cell";
import axios from "axios";

export type Word = {
  id: number;
  word: string;
  translationUk: string;
};

// type TableProps = {
//   words: Word[];
// };

type Texts = {
  texts: {
    en: string;
    uk: string;
  };
};

const WordsTable = ({ texts, ...props }: Texts) => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await axios.get("http://localhost:8876/api/v1/words");

        setWords(res.data.data);
      } catch (error) {}
    }

    fetchWords();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(3,_minmax(180px,_1fr))] md:grid-cols-3 w-full overflow-x-auto">
      <Cell />
      <Cell>{texts.en}</Cell>
      <Cell>{texts.uk}</Cell>
      {...words.map((word, index) => (
        <>
          <Cell>{word.id}</Cell>
          <Cell>{word.word}</Cell>
          <Cell>{word.translationUk}</Cell>
        </>
      ))}
    </div>
  );
};

export default WordsTable;
