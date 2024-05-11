// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import FormWrapper from "@/components/wrappers/FormWrapper";
import { overkill } from "@/modules/internationalization/navigation";
import LoginForm from "@/components/forms/login/Form";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("login.title"),
    descriptions: t("login.description"),
  };
}

const Login = () => {
  const t = useTranslations("Login"); // get page translation

  return (
    <FormWrapper title={t("heading")}>
      <LoginForm
        texts={overkill(
          ["texts.email", "texts.password", "texts.login", "texts.register"],
          t
        )}
        errors={overkill(
          [
            "errors.emailRequired",
            "errors.emailInvalid",
            "errors.passwordRequired",
            "errors.passwordLen",
            "errors.passwordLat",
            "errors.loginFailed",
            "errors.serverError",
          ],
          t
        )}
      />
    </FormWrapper>
  );
};

export default Login;
