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
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { UserInfo } from "@/modules/redux/user/userSlice";
import StyledButton from "@/ui/Button";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import Search from "@/components/collections/Search";

export type Word = {
  id: number;
  word: string;
  translationUk: string;
};

type TableProps = {
  //   users: Word[];
  query?: string;
  page?: string;
};

type Texts = {
  texts: {
    names: string;
    surnames: string;
    emails: string;
    usersWords: string;
    usersCollections: string;
    block: string;
    unblock: string;
    search: string;
  };
};

const UsersTable = ({ texts, ...props }: Texts & TableProps) => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [page, setPage] = useState(props.page ? Number(props.page) : 1);
  const [countOfPages, setCountOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: Store) => state.user);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/users?page=${page}${
          props.query ? `&query=${props.query}` : ""
        }`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setUsers(res.data.data.users);
      setCountOfPages(res.data.data.lastPage);
    } catch (error) {}
  }

  useEffect(() => {
    fetchUsers();
    setIsLoading(false);
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

  const handleBlock = async (userId: number) => {
    try {
      await axios.patch(
        `http://18.212.227.5:8876/api/v1/users/${userId}/blockOrUnblock`,
        null,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/users?page=${page}${
          props.query ? `&query=${props.query}` : ""
        }`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setUsers(res.data.data.users);
    } catch (error) {}
  };

  useEffect(() => {
    setPage(1);
  }, [props.query]);

  return (
    <>
      <Search text={{ text: texts.search }} />
      {isLoading ? (
        <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen" />
      ) : (
        <div className="grid grid-cols-[repeat(5,_minmax(180px,_1fr))] w-full overflow-x-auto">
          <Cell />
          <Cell>{texts.names}</Cell>
          <Cell>{texts.surnames}</Cell>
          <Cell>{texts.emails}</Cell>
          <Cell>
            {texts.block}/{texts.unblock}
          </Cell>
          {...users.map((user, index) => (
            <>
              <Cell isMarked={user.isAdmin ? true : undefined}>{user.id}</Cell>
              <Cell isMarked={user.isAdmin ? true : undefined}>
                {user.name}
              </Cell>
              <Cell isMarked={user.isAdmin ? true : undefined}>
                {user.surname}
              </Cell>
              <Cell isMarked={user.isAdmin ? true : undefined}>
                {user.email}
              </Cell>
              <Cell isMarked={user.isAdmin ? true : undefined}>
                {user.isBlocked ? (
                  <StyledButton
                    variant="contained"
                    onClick={() => handleBlock(user.id!)}
                  >
                    {texts.unblock}
                  </StyledButton>
                ) : (
                  <StyledButton
                    color="error"
                    variant="contained"
                    onClick={() => handleBlock(user.id!)}
                  >
                    {texts.block}
                  </StyledButton>
                )}
              </Cell>
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
