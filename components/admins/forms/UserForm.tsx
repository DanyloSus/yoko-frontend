"use client";

import FormWrapper from "@/components/wrappers/FormWrapper";
import { useRouter } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const UserForm = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const user = useSelector((state: Store) => state.user);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        const res = await axios.patch(
          `http://localhost:8876/api/v1/users/${params.id}`,
          value,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        router.back();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <form onSubmit={formik.handleSubmit}>
        <FormWrapper title="Update User" removeBorder isDark>
          <div className="flex gap-[20px] w-full">
            <StyledTextField
              className="w-full"
              label="Name"
              type="text"
              name="name"
              error={Boolean(formik.errors.name) || formik.errors.name === ""}
              helperText={formik.errors.name ? formik.errors.name : ""}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <StyledTextField
              className="w-full"
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
            className="w-full"
            label="Email"
            type="email"
            name="email"
            error={Boolean(formik.errors.email) || formik.errors.email === ""}
            helperText={formik.errors.email ? formik.errors.email : ""}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="w-full flex justify-between">
            <StyledButton variant="contained" color="error">
              Ban User
            </StyledButton>
            <StyledButton variant="contained" type="submit">
              Confirm
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default UserForm;
