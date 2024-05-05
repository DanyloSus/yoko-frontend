// external imports
import React from "react";

// internal imports
import Cell from "./Cell";

export type Collection = {
  heading: string;
  content: string;
  state: string;
  userId: number | null;
};

type TableProps = {
  collections: Collection[];
};

type Texts = {
  texts: {
    headings: string;
    contents: string;
    states: string;
    userId: string;
  };
};

const CollectionsTable = ({ texts, ...props }: TableProps & Texts) => {
  return (
    <div className="grid grid-cols-5">
      <Cell />
      <Cell>{texts.headings}</Cell>
      <Cell>{texts.contents}</Cell>
      <Cell>{texts.states}</Cell>
      <Cell>{texts.userId}</Cell>
      {...props.collections.map((collection, index) => (
        <>
          <Cell>{index}</Cell>
          <Cell>{collection.heading}</Cell>
          <Cell>{collection.content}</Cell>
          <Cell>{collection.state}</Cell>
          <Cell>{collection.userId ? collection.userId : "null"}</Cell>
        </>
      ))}
    </div>
  );
};

export default CollectionsTable;
