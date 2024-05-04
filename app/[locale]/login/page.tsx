import LoginForm from "@/components/login/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";

const Login = () => {
  const t = useTranslations("Login");

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
      <FormWrapper title={t("header")}>
        <LoginForm
          texts={{
            email: t("email"),
            login: t("login"),
            password: t("password"),
            register: t("register"),
          }}
        />
      </FormWrapper>
    </main>
  );
};

export default Login;
