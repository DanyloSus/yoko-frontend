import RegisterForm from "@/components/register/Form";
import FormWrapper from "@/ui/wrappers/FormWrapper";
import React from "react";

const Register = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500">
      <FormWrapper title="Register">
        <RegisterForm />
      </FormWrapper>
    </main>
  );
};

export default Register;
