import RegisterForm from "@/components/register/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";

const Register = () => {
  const t = useTranslations("Register");

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
      <FormWrapper title={t("header")}>
        <RegisterForm
          errors={{
            emailTaken: t("errors.emailTaken"),
            latin: t("errors.latin"),
            len: t("errors.len"),
            lenPassword: t("errors.lenPassword"),
            somethingWrong: t("errors.somethingWrong"),
          }}
          texts={{
            surname: t("texts.surname"),
            email: t("texts.email"),
            login: t("texts.login"),
            name: t("texts.name"),
            password: t("texts.password"),
            register: t("texts.register"),
          }}
        />
      </FormWrapper>
    </main>
  );
};

export default Register;
