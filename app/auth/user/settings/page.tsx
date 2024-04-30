import SettingsForm from "@/components/settings/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import React from "react";

const UserSettings = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[780px] w-full">
      <FormWrapper title="Update Info" isDark>
        <SettingsForm />
      </FormWrapper>
    </div>
  );
};

export default UserSettings;
