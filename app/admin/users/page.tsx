import UsersTable from "@/components/admins/tables/UsersTable";
import React from "react";
import { UserInfo } from "@/modules/redux/user/userSlice";

const UsersAdminPage = () => {
  const users: UserInfo[] = [
    {
      id: 1,
      email: "john@doe",
      isAdmin: true,
      name: "John",
      surname: "Doe",
      token: null,
    },
    {
      id: 2,
      email: "jane@doe",
      isAdmin: false,
      name: "Jane",
      surname: "Doe",
      token: null,
    },
  ];

  return <UsersTable users={users} />;
};

export default UsersAdminPage;
