// external imports
import React from "react";

// internal imports
import Cell from "./Cell";
import { UserInfo } from "@/modules/redux/user/userSlice";

type TableProps = {
  users: UserInfo[];
};

type Texts = {
  texts: {
    names: string;
    surnames: string;
    emails: string;
    usersWords: string;
    usersCollections: string;
  };
};

const UsersTable = ({ texts, ...props }: TableProps & Texts) => {
  return (
    <div className="grid grid-cols-6">
      <Cell />
      <Cell>{texts.names}</Cell>
      <Cell>{texts.surnames}</Cell>
      <Cell>{texts.emails}</Cell>
      <Cell>{texts.usersWords}</Cell>
      <Cell>{texts.usersCollections}</Cell>
      {...props.users.map((user, index) => (
        <>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.id}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.name}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.surname}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>{user.email}</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>Words</Cell>
          <Cell isMarked={user.isAdmin ? true : undefined}>Collections</Cell>
        </>
      ))}
    </div>
  );
};

export default UsersTable;
