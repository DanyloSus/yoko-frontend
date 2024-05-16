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
import { Store } from "@/modules/redux/store";
import { useSelector } from "react-redux";
import Search from "@/components/collections/Search";

export type Word = {
  id: number;
  word: string;
  translationUk: string;
};

type TableProps = {
  //   words: Word[];
  query?: string;
  page?: string;
};

type Texts = {
  texts: {
    en: string;
    uk: string;
    search: string;
  };
};

const WordsTable = ({ texts, ...props }: Texts & TableProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(props.page ? Number(props.page) : 1);
  const [countOfPages, setCountOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: Store) => state.user);

  async function fetchWords() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/words?page=${page}${
          props.query ? `&query=${props.query}` : ""
        }`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setWords(res.data.data.words);
      setCountOfPages(res.data.data.lastPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

  useEffect(() => {
    setPage(1);
    fetchWords();
  }, [props.query]);

  return (
    <>
      <Search text={{ text: texts.search }} />
      {isLoading ? (
        <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen" />
      ) : (
        <div className="grid grid-cols-[repeat(3,_minmax(180px,_1fr))] w-full overflow-x-auto">
          <Cell />
          <Cell>{texts.en}</Cell>
          <Cell>{texts.uk}</Cell>
          {...words.map((word, index) => (
            <>
              <Cell>
                <Link href={`/admin/words/${word.id}`}>{word.id}</Link>
              </Cell>
              <Cell>{word.word}</Cell>
              <Cell>{word.translationUk}</Cell>
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

export default WordsTable;
