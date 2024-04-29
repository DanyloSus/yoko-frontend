import LoginForm from "@/components/login/Form";
import FormWrapper from "@/ui/wrappers/FormWrapper";
import React from "react";

const Login = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
      <FormWrapper title="Login">
        <LoginForm />
      </FormWrapper>
    </main>
  );
};

export default Login;
