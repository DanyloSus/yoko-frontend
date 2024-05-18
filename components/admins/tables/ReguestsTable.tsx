"use client";

// external imports
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// internal imports
import {
  Link,
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { Collection } from "@/modules/types/elements";
import { RequestsResponse } from "@/modules/types/responses";
import Search from "@/ui/Search";
import StyledPagination from "@/ui/mui/Pagination";
import Cell from "./Cell";

type TableProps = {
  //   users: Word[];
  query?: string;
  page?: string;
};

type TableTexts = {
  texts: {
    headings: string;
    contents: string;
    states: string;
    userId: string;
    search: string;
  };
};

const RequestsTable = ({ texts, ...props }: TableTexts & TableProps) => {
  // state for saving requests
  const [collections, setCollections] = useState<Collection[]>([]);
  // state for page
  const [page, setPage] = useState(props.page ? Number(props.page) : 1);
  // state for count of pages, for pagination
  const [countOfPages, setCountOfPages] = useState(1);
  // state for loading
  const [isLoading, setIsLoading] = useState(true);

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // function to fetch requests
  async function fetchRequests() {
    setIsLoading(true);
    try {
      const res: RequestsResponse = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/requests?page=${page}${
          props.query ? `&query=${props.query}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // set requests
      setCollections(res.data.data.requests);
      // set count of pages for pagination
      setCountOfPages(res.data.data.lastPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // use effect to fetch words on start and changing page
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // get params queries
  const searchParams = useSearchParams();
  // get page's pathname
  const pathname = usePathname();
  // router for changing page by code
  const router = useRouter();

  // function for changing page
  const handleSearch = (page: string) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // use effect to change page and fetch requests when query
  // changing
  useEffect(() => {
    setPage(1);
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.query]);

  return (
    <>
      <Search text={{ text: texts.search }} />
      {isLoading ? (
        <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen" />
      ) : (
        <div className="grid grid-cols-[repeat(5,_minmax(180px,_1fr))] w-full overflow-x-auto">
          <Cell />
          <Cell>{texts.headings}</Cell>
          <Cell>{texts.contents}</Cell>
          <Cell>{texts.states}</Cell>
          <Cell>{texts.userId}</Cell>
          {collections.map((collection, index) => (
            <>
              <Cell>
                <Link href={`/admin/collections/${collection.id}`}>
                  {collection.id}
                </Link>
              </Cell>
              <Cell>{collection.name}</Cell>
              <Cell>{collection.text}</Cell>
              <Cell>{collection.status}</Cell>
              <Cell>{collection.userId ? collection.userId : "null"}</Cell>
            </>
          ))}
        </div>
      )}
      <StyledPagination
        onChange={(e, value) => {
          handleSearch(value.toString());
          setPage(value);
        }}
        count={countOfPages}
        page={page}
      />
    </>
  );
};

export default RequestsTable;
