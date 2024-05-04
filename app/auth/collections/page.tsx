"use client";

import CollectionTitle from "@/components/CollectionTitle";
import Sort from "@/components/sort/Sort";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Collection = {
  id: number;
  title: string;
};

const Collections = () => {
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

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <h1 className="text-h1 text-center">Collections</h1>
      <Sort />
      {isLoading ? (
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
        <h3 className="text-center text-h3">It&apos;s nothing here yet</h3>
      )}
    </div>
  );
};

export default Collections;
