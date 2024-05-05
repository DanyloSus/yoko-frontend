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
    email: string;
    password: string;
    login: string;
    register: string;
  };
  errors: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordLen: string;
    passwordLat: string;
    loginFailed: string;
    serverError: string;
  };
};

const LoginForm = ({ texts, errors }: Texts) => {
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
      email: "",
      password: "",
    },
    // validation
    validationSchema: Yup.object({
      email: Yup.string()
        .required(errors.emailRequired)
        .email(errors.emailInvalid),
      password: Yup.string()
        .required(errors.passwordRequired)
        .test("latin", errors.passwordLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.passwordLen,
          (val) => val.length >= 1 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      setIsLoading(true);

      try {
        // set post method to login user
        const res = await axios.post(
          "http://localhost:8876/api/v1/auth/login",
          value
        );

        // get user's token
        const token = res.data.data.token;

        // set token to cookie
        await axios.post("/api/cookies", JSON.stringify(token));

        // write user to redux
        dispatch(
          login({
            id: res.data.data.user.id,
            email: res.data.data.user.email,
            name: res.data.data.user.name,
            surname: res.data.data.user.surname,
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
          formik.setErrors({
            email: "",
            password: errors.loginFailed,
          });
        } else {
          try {
            // admin login
            const res = await axios.post(
              "http://localhost:8876/api/v1/auth/admin-login",
              value
            );

            // admin's token
            const token = res.data.data.token;
            // admin's data
            const dataAdmin = res.data.data.user;

            // write admin to redux
            dispatch(
              login({
                id: dataAdmin.id,
                email: dataAdmin.email,
                token,
                isAdmin: true,
              })
            );

            // change page
            router.push("/auth/collections");
            setIsLoading(false);
          } catch (error) {
            // error handling
            formik.setErrors({
              email: "",
              password: errors.serverError,
            });
          }
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
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password ? formik.errors.password : ""}
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between w-full">
          <StyledButton
            variant="contained"
            onClick={() => router.push("/register")}
            disabled={isLoading}
          >
            {texts.register}
          </StyledButton>
          <StyledButton
            sx={{ width: "80px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {texts.login}
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
