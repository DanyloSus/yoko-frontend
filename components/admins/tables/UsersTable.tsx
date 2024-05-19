"use client";

// external imports
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// internal imports
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { UserInfo } from "@/modules/redux/user/userSlice";
import { UsersResponse } from "@/modules/types/responses";
import Search from "@/ui/Search";
import StyledButton from "@/ui/mui/Button";
import StyledPagination from "@/ui/mui/Pagination";
import Cell from "./Cell";

type TableProps = {
  //   users: Word[];
  query?: string;
  page?: string;
};

type TableTexts = {
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

const UsersTable = ({ texts, ...props }: TableTexts & TableProps) => {
  // state for saving users
  const [users, setUsers] = useState<UserInfo[]>([]);
  // state for page
  const [page, setPage] = useState(props.page ? Number(props.page) : 1);
  // state for count of pages, for pagination
  const [countOfPages, setCountOfPages] = useState(1);
  // state for loading
  const [isLoading, setIsLoading] = useState(true);

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // function to fetch users
  async function fetchUsers() {
    setIsLoading(true);
    try {
      const res: UsersResponse = await axios.get(
        `/api/admin/users?page=${page}${
          props.query ? `&query=${props.query}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // set users
      setUsers(res.data.data.users);
      // set count of pages for pagination
      setCountOfPages(res.data.data.lastPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // use effect to fetch users on start and changing page
  useEffect(() => {
    fetchUsers();
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

  // function for block/unblock user
  const handleBlock = async (userId: number) => {
    try {
      await axios.patch(`/api/admin/users/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Update the user state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, isBlocked: user.isBlocked === 0 ? 1 : 0 }
            : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // use effect to change page and fetch users when query
  // changing
  useEffect(() => {
    setPage(1);
    fetchUsers();
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
