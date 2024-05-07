import UserForm from "@/components/admins/forms/UserForm";
import React from "react";

const UserPage = ({ params }: { params: { id: string } }) => {
  return <UserForm params={params} />;
};

export default UserPage;
