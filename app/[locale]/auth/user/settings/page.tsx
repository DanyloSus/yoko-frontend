import { overkill } from "@/app/[locale]/login/page";
import SettingsForm from "@/components/settings/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";

const UserSettings = () => {
  const t = useTranslations("UserSettings");

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[780px] w-full">
      <FormWrapper title={t("heading")} isDark>
        <SettingsForm
          errors={overkill(
            [
              "errors.nameRequired",
              "errors.nameLen",
              "errors.nameLat",
              "errors.surnameRequired",
              "errors.surnameLen",
              "errors.surnameLat",
              "errors.newPasswordLen",
              "errors.newPasswordLat",
              "errors.passwordConfirmationsLen",
              "errors.passwordConfirmationsLat",
              "errors.writeNew",
              "errors.writeConfirmation",
              "errors.dontMatch",
              "errors.serverError",
            ],
            t
          )}
          texts={overkill(
            [
              "texts.name",
              "texts.surname",
              "texts.newPassword",
              "texts.passwordConfirm",
              "texts.delete",
              "texts.confirm",
              "texts.dialogHeading",
              "texts.dialogContent",
              "texts.cancel",
            ],
            t
          )}
        />
      </FormWrapper>
    </div>
  );
};

export default UserSettings;
