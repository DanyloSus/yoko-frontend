// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import SettingsForm from "@/components/forms/settings/Form";
import { overkill } from "@/modules/internationalization/navigation";
import FormWrapper from "@/components/wrappers/FormWrapper";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("settings.title"),
  };
}

const UserSettings = () => {
  const t = useTranslations("UserSettings"); // get page translation

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
