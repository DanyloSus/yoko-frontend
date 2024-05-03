import React from "react";
import Cell from "./Cell";

export type Word = {
  EN: string;
  UK: string[];
};

type TableProps = {
  words: Word[];
};

const WordsTable = (props: TableProps) => {
  return (
    <div className="grid grid-cols-3 w-full">
      <Cell />
      <Cell>Word EN</Cell>
      <Cell>Word UK</Cell>
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
