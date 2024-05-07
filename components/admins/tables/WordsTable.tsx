// external imports
import React from "react";

// internal imports
import Cell from "./Cell";

export type Word = {
  EN: string;
  UK: string[];
};

type TableProps = {
  words: Word[];
};

type Texts = {
  texts: {
    en: string;
    uk: string;
  };
};

const WordsTable = ({ texts, ...props }: TableProps & Texts) => {
  return (
    <div className="grid grid-cols-[repeat(3,_minmax(180px,_1fr))] md:grid-cols-3 w-full overflow-x-auto">
      <Cell />
      <Cell>{texts.en}</Cell>
      <Cell>{texts.uk}</Cell>
      {...props.words.map((word, index) => (
        <>
          <Cell>{index}</Cell>
          <Cell>{word.EN}</Cell>
          <Cell>{word.UK.join(", ")}</Cell>
        </>
      ))}
    </div>
  );
};

export default WordsTable;
