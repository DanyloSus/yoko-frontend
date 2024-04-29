"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "@/modules/axios/axios";

const RegisterForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
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
      console.log(value);
      //   const res = await axios.post("/auth/register");

      //   console.log(res);
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
