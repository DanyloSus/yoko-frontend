"use client";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CollectionTitle from "./CollectionTitle";

type Collection = {
  id: number;
  title: string;
};

type CollectionsTexts = {
  texts: {
    null: string;
  };
};

const Collections = ({ texts }: CollectionsTexts) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCollections() {
      const res = await axios.get("http://localhost:8876/api/v1/collections");
      console.log(res);

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
    <h3 className="text-center text-h3">{texts.null}</h3>
  );
};

export default Collections;
