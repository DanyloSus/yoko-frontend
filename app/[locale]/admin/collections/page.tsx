// external imports
import React from "react";
import { useTranslations } from "next-intl";

// internal imports
import CollectionsTable, {
  Collection,
} from "@/components/admins/tables/CollectionsTable";
import { overkill } from "@/modules/internationalization/navigation";

const UsersAdminPage = () => {
  const t = useTranslations("Admin"); // get page translation

  // // dummy data
  // const collections: Collection[] = [
  //   {
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur. Adipiscing luctus lacus placerat orci suspendisse. Sit dolor volutpat vitae massa nibh vitae. Quis adipiscing enim mauris adipiscing imperdiet sed egestas pulvinar ullamcorper. Nascetur nunc accumsan tellus vulputate vitae.",
  //     heading: "Heading",
  //     state: "Private",
  //     userId: null,
  //   },
  //   {
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur. Adipiscing luctus lacus placerat orci suspendisse. Sit dolor volutpat vitae massa nibh vitae. Quis adipiscing enim mauris adipiscing imperdiet sed egestas pulvinar ullamcorper. Nascetur nunc accumsan tellus vulputate vitae.",
  //     heading: "Something New",
  //     state: "Unactive",
  //     userId: 2,
  //   },
  // ];

  return (
    <CollectionsTable
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

export default UsersAdminPage;
