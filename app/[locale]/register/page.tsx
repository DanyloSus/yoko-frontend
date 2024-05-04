import RegisterForm from "@/components/register/Form";
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useTranslations } from "next-intl";
import React from "react";
import { overkill } from "../login/page";

const Register = () => {
  const t = useTranslations("Register");

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
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
    </main>
  );
};

export default Register;
