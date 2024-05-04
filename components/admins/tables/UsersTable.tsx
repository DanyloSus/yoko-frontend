import React from "react";
import Cell from "./Cell";
import { UserInfo } from "@/modules/redux/user/userSlice";

type TableProps = {
  users: UserInfo[];
};

const UsersTable = (props: TableProps) => {
  return (
    <div className="grid grid-cols-6">
      <Cell />
      <Cell>Names</Cell>
      <Cell>Surnames</Cell>
      <Cell>Emails</Cell>
      <Cell>Users&apos; Words</Cell>
      <Cell>Users&apos; Collections</Cell>
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
