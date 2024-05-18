// hooks need CSR
"use client";

// external imports
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";
import { Collection } from "@/modules/types/elements";
import { CollectionsResponse } from "@/modules/types/responses";
import CollectionTitle from "./CollectionTitle";

type StoreTexts = {
  texts: {
    null: string;
    error: string;
    loading: string;
  };
};

type StoreProps = {
  query: string;
};

const StoreContent = ({ texts, ...props }: StoreTexts & StoreProps) => {
  const [isLoading, setIsLoading] = useState(true); // state to load while fetching collections
  const [collections, setCollections] = useState<Collection[]>([]); // state of collections' array
  const [page, setPage] = useState(2); // state of pages which will be fetched
  const [lastPage, setLastPage] = useState(0); // last page for pagination
  const [error, setError] = useState(false); // is error state

  const { ref, inView } = useInView(); // hook for use some function when element is in view, for infinite scroll

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // function for loading collections
  const loadMoreCollections = async () => {
    try {
      const res: CollectionsResponse = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/public?page=${page}${
          props.query.trim().length ? `&query=${props.query}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // set new collections to old
      setCollections((prevCollections) => [
        ...prevCollections,
        ...res.data.data.data,
      ]);

      // if page isn't last then add +1
      if (page - 1 < lastPage) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // use effect to use when loading element in view
  useEffect(() => {
    if (inView) {
      setIsLoading(true);
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
      const res: CollectionsResponse = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/public${
          props.query.trim().length ? `?query=${props.query}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // set collections
      setCollections(res.data.data.data);
      setIsLoading(false);
      // set last page
      setLastPage(res.data.data.lastPage);
    }

    fetchCollections();
  }, [props.query, user.token]);

  // function for getting loading animated tiles
  const getLoading = () => {
    const loadingElement: ReactNode[] = [];

    for (let i = 0; i < 12; i++) {
      loadingElement.push(<CollectionTitle key={i} isLoading />);
    }

    return <>{loadingElement}</>;
  };

  return (
    <div className="flex flex-col items-stretch sm:grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 relative">
      {(collections.length || isLoading) && !error ? (
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
            <div ref={ref} className="loading">
              {texts.loading}
            </div>
          ) : null}
        </>
      ) : (
        <h3 className="absolute text-h3 left-1/2 -translate-x-1/2 text-center w-full">
          {error ? texts.error : texts.null}
        </h3>
      )}
    </div>
  );
};

export default StoreContent;
