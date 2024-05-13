// hooks need CSR
"use client";

// external imports
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

// internal imports
import CollectionTitle from "./CollectionTitle";
import { Store } from "@/modules/redux/store";

type Collection = {
  id: number;
  name: string;
  posterUrl: string;
};

type Texts = {
  texts: {
    null: string;
  };
};

type StoreProps = {
  query: string;
};

const StoreContent = ({ texts, ...props }: Texts & StoreProps) => {
  const [isLoading, setIsLoading] = useState(true); // state to load while fetching collections
  const [collections, setCollections] = useState<Collection[]>([]); // state of collections' array
  const [page, setPage] = useState(2);
  const [lastPage, setLastPage] = useState(0);
  const { ref, inView } = useInView();

  const user = useSelector((state: Store) => state.user);

  const loadMoreCollections = async () => {
    const res = await axios.get(
      `http://localhost:8876/api/v1/collections/public?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setCollections((prevCollections) => [
      ...prevCollections,
      ...res.data.data.data,
    ]);
    if (page - 1 < lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreCollections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // fetching collections
  useEffect(() => {
    setCollections([]);
    setPage(2);
    setIsLoading(true);

    async function fetchCollections() {
      const res = await axios.get(
        `http://localhost:8876/api/v1/collections/public${
          props.query ? `?query=${props.query}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCollections(res.data.data.data);
      setIsLoading(false);
      setLastPage(res.data.data.lastPage);
    }

    fetchCollections();
  }, [props.query, user.token]);

  const getLoading = () => {
    const loadingElement: ReactNode[] = [];

    for (let i = 0; i < 10; i++) {
      loadingElement.push(<CollectionTitle key={i} isLoading />);
    }

    return <>{loadingElement}</>;
  };

  return (
    <>
      <div className="flex flex-col items-stretch sm:grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {collections.length || isLoading ? (
          <>
            {...collections.map((collection) => (
              <CollectionTitle
                key={collection.id}
                id={collection.id}
                title={collection.name}
                image={collection.posterUrl}
              />
            ))}
            {isLoading ? (
              getLoading()
            ) : page - 1 < lastPage ? (
              <div ref={ref}>Loading...</div>
            ) : null}
          </>
        ) : (
          <h3 className="text-center text-h4 sm:text-h3">{texts.null}</h3>
        )}
      </div>
    </>
  );
};

export default StoreContent;
