// external imports
import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import UsersTable from "@/components/admins/tables/UsersTable";
import { overkill } from "@/modules/internationalization/navigation";
import { UserInfo } from "@/modules/redux/user/userSlice";

// create static metadata
export const metadata: Metadata = {
  title: "Users Page",
};

const UsersAdminPage = () => {
  const t = useTranslations("Admin"); // get page translation

  // dummy data
  const users: UserInfo[] = [
    {
      id: 1,
      email: "john@doe",
      isAdmin: true,
      name: "John",
      surname: "Doe",
    },
    {
      id: 2,
      email: "jane@doe",
      isAdmin: false,
      name: "Jane",
      surname: "Doe",
    },
  ];

  return (
    <UsersTable
      users={users}
      texts={overkill(
        [
          "users.names",
          "users.surnames",
          "users.emails",
          "users.usersWords",
          "users.usersCollections",
        ],
        t
      )}
    />
  );
};

export default UsersAdminPage;
