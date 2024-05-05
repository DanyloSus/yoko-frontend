// hooks need CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

// internal imports
import CollectionTitle from "./CollectionTitle";

type Collection = {
  id: number;
  title: string;
};

type Texts = {
  texts: {
    null: string;
  };
};

const Collections = ({ texts }: Texts) => {
  const [isLoading, setIsLoading] = useState(true); // state to load while fetching collections
  const [collections, setCollections] = useState<Collection[]>([]); // state of collections' array

  // fetching collections
  useEffect(() => {
    setIsLoading(true);

    async function fetchCollections() {
      const res = await axios.get("http://localhost:8876/api/v1/collections");

      setCollections(res.data);
      setIsLoading(false);
    }

    fetchCollections();
  }, []);

  return isLoading ? (
    <CircularProgress color="primary" className="mx-auto" />
  ) : collections.length > 0 ? (
    <div className="grid gap-4 grid-cols-4">
      {...collections.map((collection) => (
        <CollectionTitle
          key={collection.id}
          id={collection.id}
          title={collection.title}
        />
      ))}
    </div>
  ) : (
    // if collections' length is 0 then show text
    <h3 className="text-center text-h3">{texts.null}</h3>
  );
};

export default Collections;
