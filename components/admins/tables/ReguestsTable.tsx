"use client";

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Cell from "./Cell";
import axios from "axios";
import { CircularProgress, Pagination } from "@mui/material";
import StyledPagination from "@/ui/Pagination";
import { useSearchParams } from "next/navigation";
import {
  Link,
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { UserInfo } from "@/modules/redux/user/userSlice";
import StyledButton from "@/ui/Button";
import { Store } from "@/modules/redux/store";
import { useSelector } from "react-redux";
import Search from "@/components/collections/Search";

export type Collection = {
  id: number;
  name: string;
  status: string;
  text: string;
};

type TableProps = {
  //   users: Word[];
  query?: string;
  page?: string;
};

type Texts = {
  texts: {
    headings: string;
    contents: string;
    states: string;
    userId: string;
  };
};

const UsersTable = ({ texts, ...props }: Texts & TableProps) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState(props.page ? Number(props.page) : 1);
  const [countOfPages, setCountOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchusers() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://54.92.220.133:8876/api/v1/collections/requests?page=${page}${
            props.query ? `&query=${props.query}` : ""
          }`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        setCollections(res.data.data.requests);
        setCountOfPages(res.data.data.lastPage);
      } catch (error) {}
    }

    fetchusers();
    setIsLoading(false);
  }, [page, props.query]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (page: string) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Search />
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
              <Cell>{collection.id ? collection.id : "null"}</Cell>
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

export default UsersTable;
