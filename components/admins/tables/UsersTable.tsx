"use client";

// external imports
import React, { useEffect, useState } from "react";

// internal imports
import Cell from "./Cell";
import { UserInfo } from "@/modules/redux/user/userSlice";
import axios from "axios";
import { Link } from "@/modules/internationalization/navigation";

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

        setUsers(res.data.data);
      } catch (error) {}
    }

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(5,_minmax(180px,_1fr))] md:grid-cols-5 overflow-x-auto min-w-0 min-h-0">
      <Cell />
      <Cell>{texts.names}</Cell>
      <Cell>{texts.surnames}</Cell>
      <Cell>{texts.emails}</Cell>
      <Cell>{texts.usersCollections}</Cell>
      {...users.map((user, index) => (
        <>
          <Cell isMarked={user.isAdmin ? true : undefined}>
            <Link href={`/admin/users/${user.id}`}>{user.id}</Link>
          </Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.name}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.surname}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.email}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>Collections</Cell>
        </>
      ))}
    </div>
  );
};

export default UsersTable;
