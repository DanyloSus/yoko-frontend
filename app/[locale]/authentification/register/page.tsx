// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import FormWrapper from "@/components/wrappers/FormWrapper";
import { overkill } from "@/modules/internationalization/navigation";
import RegisterForm from "@/components/forms/register/Form";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("register.title"),
    descriptions: t("register.description"),
  };
}

const Register = () => {
  const t = useTranslations("Register"); // get page translation

  return (
    <FormWrapper title={t("heading")}>
      <RegisterForm
        errors={overkill(
          [
            "errors.nameRequired",
            "errors.nameLen",
            "errors.nameLat",
            "errors.surnameRequired",
            "errors.surnameLen",
            "errors.surnameLat",
            "errors.emailRequired",
            "errors.emailInvalid",
            "errors.emailExists",
            "errors.passwordRequired",
            "errors.passwordLen",
            "errors.passwordLat",
            "errors.serverError",
          ],
          t
        )}
        texts={overkill(
          [
            "texts.surname",
            "texts.email",
            "texts.login",
            "texts.name",
            "texts.password",
            "texts.register",
          ],
          t
        )}
      />
    </FormWrapper>
  );
};

export default Register;
