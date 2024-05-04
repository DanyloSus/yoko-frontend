"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/modules/redux/user/userSlice";
import { Store } from "@/modules/redux/store";

const LoginForm = () => {
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

          console.log(data);

          dispatch(
            login({
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
          "Must be from 1 to 20 characters",
          (val) => val.length >= 1 && val.length <= 20
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

        const { data } = await axios.get("http://localhost:8876/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          login({
            email: data.email,
            name: data.name,
            surname: data.surname,
            token,
            isAdmin: false,
          })
        );

        router.push("/auth/collections");
        setIsLoading(false);
      } catch (error: any) {
        if (error.response && error.response!.status === 422) {
          formik.setErrors({
            email: "",
            password: "Your credentials are incorrect",
          });
        } else {
          try {
            const res = await axios.post(
              "http://localhost:8876/api/v1/auth/admin-login",
              value
            );

            const token = res.data.data.token;

            const dataAdmin = res.data.data.user;

            dispatch(
              login({
                email: dataAdmin.email,
                name: null,
                surname: null,
                token,
                isAdmin: true,
              })
            );

            router.push("/auth/collections");
            setIsLoading(false);
          } catch (error) {
            formik.setErrors({
              email: "",
              password: "Something went wrong",
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
            label="Email"
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
            label="Password"
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
            sx={{ width: "102px" }}
            variant="contained"
            onClick={() => router.push("/register")}
            disabled={isLoading}
          >
            Register
          </StyledButton>
          <StyledButton
            sx={{ width: "80px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Login
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
