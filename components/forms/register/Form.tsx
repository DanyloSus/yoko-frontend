// hooks needs CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

// internal imports
import useAuthedReplace from "@/modules/auth/hooks/useAuthedReplace";
import { useRouter } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { login } from "@/modules/redux/user/userSlice";
import StyledTextField from "@/ui/TextField";
import StyledButton from "@/ui/Button";

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
    nameRequired: string;
    nameLen: string;
    nameLat: string;
    surnameRequired: string;
    surnameLen: string;
    surnameLat: string;
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordLen: string;
    passwordLat: string;
    serverError: string;
    emailExists: string;
  };
};

const RegisterForm = ({ texts, errors }: Texts) => {
  const [isLoading, setIsLoading] = useState(false); // state for checking is form loading

  // router for changing page by code
  const router = useRouter();

  // dispatch for slices' actions
  const dispatch = useDispatch();
  // get current user's values
  const user = useSelector((state: Store) => state.user);

  // getting function to check is user authed and if it is true then redirect to another page
  const { checkUser } = useAuthedReplace({
    page: "/auth/collections",
    setIsLoading: (val: boolean) => setIsLoading(val),
    user: user,
    replacePageIfUserAuthed: true,
  });

  // call check function on start and when user is updating
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  // formik for better form control
  const formik = useFormik({
    // initial values
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    // validation
    validationSchema: Yup.object({
      name: Yup.string()
        .required(errors.nameRequired)
        .test("latin", errors.nameLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.nameLen,
          (val) => val.length >= 1 && val.length <= 20
        ),
      surname: Yup.string()
        .required(errors.surnameRequired)
        .test("latin", errors.surnameLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.surnameLen,
          (val) => val.length >= 1 && val.length <= 20
        ),
      email: Yup.string()
        .required(errors.emailRequired)
        .email(errors.emailInvalid),
      password: Yup.string()
        .required(errors.passwordRequired)
        .test("latin", errors.passwordLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.passwordLen,
          (val) => val.length >= 8 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      setIsLoading(true);

      // back needs password_confirmation we don't check it, so we set it manualy
      value.password_confirmation = value.password;

      try {
        // send post request to create user
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/register",
          value
        );

        // get user's token
        const token = res.data.data.token;

        // write it to cookies
        await axios.post("/api/cookies", JSON.stringify(token));

        // write it to redux
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

        // change page
        router.push("/auth/collections");
        setIsLoading(false);
      } catch (error: any) {
        // error handling
        if (
          error.response &&
          (error.response!.status === 422 || error.response!.status === 401)
        ) {
          formik.setErrors({ email: errors.emailExists });
        } else {
          formik.setErrors({
            email: "",
            name: "",
            surname: "",
            password: errors.serverError,
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
        <div className="flex flex-col gap-[10px] lg:gap-[20px] justify-stretch w-full">
          <div className="flex gap-[20px] w-full">
            <StyledTextField
              className="primary w-full"
              label={texts.name}
              type="text"
              name="name"
              error={Boolean(formik.errors.name) || formik.errors.name === ""}
              helperText={formik.errors.name ? formik.errors.name : ""}
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={isLoading}
            />
            <StyledTextField
              className="primary w-full"
              label={texts.surname}
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
            label={texts.email}
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
            label={texts.password}
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
            {texts.login}
          </StyledButton>
          <StyledButton variant="contained" type="submit" disabled={isLoading}>
            {texts.register}
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
