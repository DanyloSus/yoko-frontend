import ReguestsTable from "@/components/admins/tables/ReguestsTable";
import { overkill } from "@/modules/internationalization/navigation";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import React from "react";

// create static metadata
export const metadata: Metadata = {
  title: "Requests Page",
};

const RequestPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const t = useTranslations("Admin"); // get page translation
  const ts = useTranslations("Search"); // get page translation

  return (
    <ReguestsTable
      texts={{
        ...overkill(
          [
            "collections.headings",
            "collections.contents",
            "collections.states",
            "collections.userId",
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

export default RequestPage;
