import LoginForm from "@/components/login/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";

export const overkill = (params: string[], t: any) => {
  let values: any = {};

  params.forEach((param) => {
    values[param.split(".")[1]] = t(param);
  });

  console.log(values);

  return values;
};

const Login = () => {
  const t = useTranslations("Login");

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
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
    </main>
  );
};

export default Login;
