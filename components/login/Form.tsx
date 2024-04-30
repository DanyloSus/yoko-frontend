"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    async function fetchCookies() {
      const res = await axios.get("/api/cookies");

      const session = res.data.message;

      console.log("session", session);

      if (session !== null) router.replace("/auth/collections");
    }

    fetchCookies();

    setIsLoading(false);
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
      setIsLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/login",
          value
        );

        const token = res.data.data.token;

        await axios.post("/api/cookies", JSON.stringify(token));

        router.push("/auth/collections");
        setIsLoading(false);
      } catch (error: any) {
        if (error.response && error.response!.status === 422) {
          formik.setErrors({
            email: "",
            password: "Your credentials are incorrect",
          });
        } else {
          formik.setErrors({
            email: "",
            password: "Something went wrong",
          });
        }

        setIsLoading(false);
      }
    },
  });

  return isLoading ? (
    <CircularProgress style={{ color: "white" }} />
  ) : (
    <form className="space-y-[24px] w-full" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-[20px] justify-stretch w-full">
        <StyledTextField
          label="Email"
          type="email"
          name="email"
          error={Boolean(formik.errors.email) || formik.errors.email === ""}
          helperText={formik.errors.email ? formik.errors.email : ""}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <StyledTextField
          label="Password"
          type="password"
          name="password"
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password ? formik.errors.password : ""}
          onChange={formik.handleChange}
          value={formik.values.password}
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
