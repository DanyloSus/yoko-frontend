import CollectionForm from "@/components/admins/forms/CollectionForm";
import React from "react";

const CollectionPage = ({ params }: { params: { id: string } }) => {
  return <CollectionForm params={params} />;
};

export default CollectionPage;
