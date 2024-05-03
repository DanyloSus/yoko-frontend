import React from "react";
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

const CollectionsTable = (props: TableProps) => {
  return (
    <div className="grid grid-cols-5">
      <Cell />
      <Cell>Heading</Cell>
      <Cell>Content</Cell>
      <Cell>State</Cell>
      <Cell>User&apos;s id</Cell>
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
