// external imports
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import UsersTable from "@/components/admins/tables/UsersTable";
import { overkill } from "@/modules/internationalization/navigation";

// create static metadata
export const metadata: Metadata = {
  title: "Users Page",
};

const UsersAdminPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const t = useTranslations("Admin"); // get page translation
  const ts = useTranslations("Search"); // get page translation

  // // dummy data
  // const users: UserInfo[] = [
  //   {
  //     id: 1,
  //     email: "john@doe",
  //     isAdmin: true,
  //     name: "John",
  //     surname: "Doe",
  //   },
  //   {
  //     id: 2,
  //     email: "jane@doe",
  //     isAdmin: false,
  //     name: "Jane",
  //     surname: "Doe",
  //   },
  // ];

  return (
    <UsersTable
      // users={users}
      texts={{
        ...overkill(
          [
            "users.names",
            "users.surnames",
            "users.emails",
            "users.usersWords",
            "users.usersCollections",
            "users.block",
            "users.unblock",
          ],
          t
        ),
        search: ts("text"),
      }}
      page={searchParams?.page}
      query={searchParams?.query}
    />
  );
};

export default UsersAdminPage;
