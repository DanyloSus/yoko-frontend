import CreateStore from "@/components/forms/CreateStore";
import FormWrapper from "@/components/wrappers/FormWrapper";
import React from "react";

const AddCollectionPage = () => {
  return (
    <div className="w-full flex flex-col gap-[24px] text-center">
      <h1 className="text-h1 leading-[96px]">Add Your Collection</h1>
      <FormWrapper isDark>
        <CreateStore />
      </FormWrapper>
    </div>
  );
};

export default AddCollectionPage;
