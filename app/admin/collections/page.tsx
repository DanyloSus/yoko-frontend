import CollectionsTable, {
  Collection,
} from "@/components/admins/tables/CollectionsTable";
import React from "react";

const UsersAdminPage = () => {
  const collections: Collection[] = [
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing luctus lacus placerat orci suspendisse. Sit dolor volutpat vitae massa nibh vitae. Quis adipiscing enim mauris adipiscing imperdiet sed egestas pulvinar ullamcorper. Nascetur nunc accumsan tellus vulputate vitae.",
      heading: "Heading",
      state: "Private",
      userId: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing luctus lacus placerat orci suspendisse. Sit dolor volutpat vitae massa nibh vitae. Quis adipiscing enim mauris adipiscing imperdiet sed egestas pulvinar ullamcorper. Nascetur nunc accumsan tellus vulputate vitae.",
      heading: "Something New",
      state: "Unactive",
      userId: 2,
    },
  ];

  return <CollectionsTable collections={collections} />;
};

export default UsersAdminPage;
