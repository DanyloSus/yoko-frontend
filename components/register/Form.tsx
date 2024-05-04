"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "@/modules/internationalization/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import { login } from "@/modules/redux/user/userSlice";

type Texts = {
  texts: {
    name: string;
    surname: string;
    email: string;
    password: string;
    login: string;
    register: string;
  };
  errors: {
    emailTaken: string;
    somethingWrong: string;
    latin: string;
    len: string;
    lenPassword: string;
  };
};

const RegisterForm = (props: Texts) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    setIsLoading(true);

    if (user.token !== null) {
      router.replace("/auth/collections");
      setIsLoading(false);
      return;
    }

    async function fetchCookies() {
      try {
        const res = await axios.get("/api/cookies");

        const { token } = res.data.message;

        if (token !== null) {
          const { data } = await axios.get("http://localhost:8876/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          dispatch(
            login({
              id: data.id,
              email: data.email,
              name: data.name,
              surname: data.surname,
              token,
              isAdmin: false,
            })
          );

          router.replace("/auth/collections");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCookies();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        .test("latin", props.errors.latin, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          props.errors.len,
          (val) => val.length >= 1 && val.length <= 20
        ),
      surname: Yup.string()
        .required()
        .test("latin", props.errors.latin, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          props.errors.len,
          (val) => val.length >= 1 && val.length <= 20
        ),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .test("latin", props.errors.latin, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          props.errors.lenPassword,
          (val) => val.length >= 8 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      setIsLoading(true);
      value.password_confirmation = value.password;
      try {
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/register",
          value
        );

        const token = res.data.data.token;

        await axios.post("/api/cookies", JSON.stringify(token));

        dispatch(
          login({
            id: res.data.data.user.id,
            email: value.email,
            name: value.name,
            surname: value.surname,
            token,
            isAdmin: false,
          })
        );

        router.push("/auth/collections");
        setIsLoading(false);
      } catch (error: any) {
        if (error.response && error.response!.status === 422) {
          formik.setErrors({ email: props.errors.emailTaken });
        } else {
          formik.setErrors({
            email: "",
            name: "",
            surname: "",
            password: props.errors.somethingWrong,
          });
        }
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
          <CircularProgress style={{ color: "white" }} />
        </div>
      ) : null}
      <form className="space-y-[24px] w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-[20px] justify-stretch w-full">
          <div className="flex gap-[20px] w-full">
            <StyledTextField
              className="primary"
              label={props.texts.name}
              type="text"
              name="name"
              error={Boolean(formik.errors.name) || formik.errors.name === ""}
              helperText={formik.errors.name ? formik.errors.name : ""}
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={isLoading}
            />
            <StyledTextField
              className="primary"
              label={props.texts.surname}
              type="text"
              name="surname"
              error={
                Boolean(formik.errors.surname) || formik.errors.surname === ""
              }
              helperText={formik.errors.surname ? formik.errors.surname : ""}
              onChange={formik.handleChange}
              value={formik.values.surname}
              disabled={isLoading}
            />
          </div>
          <StyledTextField
            className="primary"
            label={props.texts.email}
            type="email"
            name="email"
            error={Boolean(formik.errors.email) || formik.errors.email === ""}
            helperText={formik.errors.email ? formik.errors.email : ""}
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={isLoading}
          />
          <StyledTextField
            className="primary"
            label={props.texts.password}
            type="password"
            name="password"
            error={
              Boolean(formik.errors.password) || formik.errors.password === ""
            }
            helperText={formik.errors.password ? formik.errors.password : ""}
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between w-full">
          <StyledButton
            sx={{ width: "80px" }}
            variant="contained"
            onClick={() => router.push("/login")}
            disabled={isLoading}
          >
            {props.texts.login}
          </StyledButton>
          <StyledButton
            sx={{ width: "102px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {props.texts.register}
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
