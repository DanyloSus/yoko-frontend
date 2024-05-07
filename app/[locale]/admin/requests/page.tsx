import ReguestsTable from "@/components/admins/tables/ReguestsTable";
import { overkill } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const RequestPage = () => {
  const t = useTranslations("Admin"); // get page translation

  return (
    <ReguestsTable
      texts={overkill(
        [
          "collections.headings",
          "collections.contents",
          "collections.states",
          "collections.userId",
        ],
        t
      )}
    />
  );
};

export default RequestPage;
