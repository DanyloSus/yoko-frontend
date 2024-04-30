"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";

const RegisterForm = () => {
  const router = useRouter();

  useEffect(() => {
    async function fetchCookies() {
      const res = await axios.get("/api/cookies");

      return res.data.message;
    }

    const session = fetchCookies();

    if (session !== null) router.replace("/auth/collections");
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
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
      surname: Yup.string()
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
      value.password_confirmation = value.password;
      // console.log(JSON.stringify(value));
      try {
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/register",
          value
        );

        const token = res.data.data.token;

        await axios.post("/api/cookies", JSON.stringify(token));

        router.push("/auth/collections");
      } catch (error: any) {
        if (error.response!.status === 422)
          formik.setErrors({ email: "Email is already taken" });
      }
    },
  });

  return (
    <form className="space-y-[24px] w-full" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-[20px] justify-stretch w-full">
        <div className="flex gap-[20px] w-full">
          <StyledTextField
            label="Name"
            type="text"
            name="name"
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name ? formik.errors.name : ""}
            onChange={formik.handleChange}
          />
          <StyledTextField
            label="Surname"
            type="text"
            name="surname"
            error={Boolean(formik.errors.surname)}
            helperText={formik.errors.surname ? formik.errors.surname : ""}
            onChange={formik.handleChange}
          />
        </div>
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
          onClick={() => router.push("/login")}
        >
          Login
        </StyledButton>
        <StyledButton sx={{ width: "80px" }} variant="contained" type="submit">
          Register
        </StyledButton>
      </div>
    </form>
  );
};

export default RegisterForm;
