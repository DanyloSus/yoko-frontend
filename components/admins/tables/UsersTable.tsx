"use client";

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Cell from "./Cell";
import { UserInfo } from "@/modules/redux/user/userSlice";
import axios from "axios";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";

// type TableProps = {
//   users: UserInfo[];
// };

type Texts = {
  texts: {
    names: string;
    surnames: string;
    emails: string;
    usersWords: string;
    usersCollections: string;
  };
};

const UsersTable = ({ texts, ...props }: Texts) => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:8876/api/v1/users");

        setUsers(res.data.data.users);
      } catch (error) {}
    }

    fetchUsers();
  }, []);

  const handleBlock = async (userId: number) => {
    try {
      await axios.patch(
        `http://localhost:8876/api/v1/users/${userId}/blockOrUnblock`
      );

      const res = await axios.get("http://localhost:8876/api/v1/users");

      setUsers(res.data.data.users);
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-[repeat(6,_minmax(180px,_1fr))] min-w-0 min-h-0">
      <Cell>User&apos;s ID</Cell>
      <Cell>{texts.names}</Cell>
      <Cell>{texts.surnames}</Cell>
      <Cell>{texts.emails}</Cell>
      <Cell>{texts.usersCollections}</Cell>
      <Cell>Block/Unblock</Cell>
      {...users.map((user, index) => (
        <>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.id}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.name}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.surname}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.email}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>Collections</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>
            {user.isBlocked ? (
              <StyledButton
                variant="contained"
                onClick={() => handleBlock(user.id!)}
              >
                Unblock
              </StyledButton>
            ) : (
              <StyledButton
                color="error"
                variant="contained"
                onClick={() => handleBlock(user.id!)}
              >
                Block
              </StyledButton>
            )}
          </Cell>
        </>
      ))}
    </div>
  );
};

export default UsersTable;
