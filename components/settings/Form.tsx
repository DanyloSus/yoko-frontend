"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const SettingsForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      new_password: "",
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
          "Must be from 1 to 20 characters",
          (val) => val.length >= 1 && val.length <= 20
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
          "Must be from 1 to 20 characters",
          (val) => val.length >= 1 && val.length <= 20
        ),
      new_password: Yup.string()
        .required("New Password is a required field")
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
      password_confirmation: Yup.string()
        .required("Password Confirmation is a required field")
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
      if (value.new_password !== value.password_confirmation) {
        formik.setErrors({
          new_password: "",
          password_confirmation: "Passwords doesn't match",
        });
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
            error={Boolean(formik.errors.name) || formik.errors.name === ""}
            helperText={formik.errors.name ? formik.errors.name : ""}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <StyledTextField
            label="Surname"
            type="text"
            name="surname"
            error={
              Boolean(formik.errors.surname) || formik.errors.surname === ""
            }
            helperText={formik.errors.surname ? formik.errors.surname : ""}
            onChange={formik.handleChange}
            value={formik.values.surname}
          />
        </div>
        <StyledTextField
          label="New Password"
          type="password"
          name="new_password"
          error={
            Boolean(formik.errors.new_password) ||
            formik.errors.new_password === ""
          }
          helperText={
            formik.errors.new_password ? formik.errors.new_password : ""
          }
          onChange={formik.handleChange}
          value={formik.values.new_password}
        />
        <StyledTextField
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          error={
            Boolean(formik.errors.password_confirmation) ||
            formik.errors.password_confirmation === ""
          }
          helperText={
            formik.errors.password_confirmation
              ? formik.errors.password_confirmation
              : ""
          }
          onChange={formik.handleChange}
          value={formik.values.password_confirmation}
        />
      </div>
      <div className="flex justify-between w-full">
        <StyledButton
          sx={{ width: "90px" }}
          variant="contained"
          onClick={() => {}}
          color="error"
        >
          Delete
        </StyledButton>
        <StyledButton sx={{ width: "101px" }} variant="contained" type="submit">
          Confirm
        </StyledButton>
      </div>
    </form>
  );
};

export default SettingsForm;
