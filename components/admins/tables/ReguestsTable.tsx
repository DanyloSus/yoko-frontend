"use client";

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Cell from "./Cell";
import axios from "axios";
import { Link } from "@/modules/internationalization/navigation";

export type Collection = {
  id: number;
  name: string;
  status: string;
  text: string;
};

// type TableProps = {
// collections: Collection[];
// };

type Texts = {
  texts: {
    headings: string;
    contents: string;
    states: string;
    userId: string;
  };
};

const RequestsTable = ({ texts, ...props }: Texts) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await axios.get(
          "http://localhost:8876/api/v1/collections/requests"
        );
        setCollections(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCollections();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(5,_minmax(180px,_1fr))]  md:grid-cols-5  max-sm:max-w-screen overflow-x-auto">
      <Cell />
      <Cell>{texts.headings}</Cell>
      <Cell>{texts.contents}</Cell>
      <Cell>{texts.states}</Cell>
      <Cell>{texts.userId}</Cell>
      {collections.length ? (
        collections.map((collection, index) => (
          <>
            <Cell>
              <Link href={`/admin/collections/${collection.id}`}>
                {collection.id}
              </Link>
            </Cell>
            <Cell>{collection.name}</Cell>
            <Cell>{collection.text}</Cell>
            <Cell>{collection.status}</Cell>
            <Cell>{collection.id ? collection.id : "null"}</Cell>
          </>
        ))
      ) : (
        <h1>It&apos;s nothing here</h1>
      )}
    </div>
  );
};

export default RequestsTable;
