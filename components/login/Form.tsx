"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    async function fetchCookies() {
      const res = await axios.get("/api/cookies");

      return res.data.message;
    }

    const session = fetchCookies();

    if (session !== null) router.replace("/auth/collections");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .test(
          "latin",
          "Must be latin characters",
          (val) => !/^[a-zA-Z]$/.test(val)
        )
        .test(
          "len",
          "Must be from 8 to 20 characters",
          (val) => val.length >= 8 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/login",
          value
        );

        const token = res.data.data.token;

        await axios.post("/api/cookies", JSON.stringify(token));

        router.push("/auth/collections");
      } catch (error: any) {
        if (error.response!.status === 401)
          formik.setErrors({
            email: true,
            password: "Your credentials are incorrect",
          });
      }
    },
  });

  return (
    <form className="space-y-[24px] w-full" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-[20px] justify-stretch w-full">
        <StyledTextField
          label="Email"
          type="email"
          name="email"
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email ? formik.errors.email : ""}
          onChange={formik.handleChange}
        />
        <StyledTextField
          label="Password"
          type="password"
          name="password"
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password ? formik.errors.password : ""}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex justify-between w-full">
        <StyledButton
          sx={{ width: "102px" }}
          variant="contained"
          onClick={() => router.push("/register")}
        >
          Register
        </StyledButton>
        <StyledButton sx={{ width: "80px" }} variant="contained" type="submit">
          Login
        </StyledButton>
      </div>
    </form>
  );
};

export default LoginForm;
