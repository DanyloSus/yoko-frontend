"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

const CreateStore = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      header: "",
      content: "",
    },
    validationSchema: Yup.object({
      header: Yup.string().required(),
      content: Yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: () => {},
  });

  return (
    <form className="flex flex-col gap-[20px]" onSubmit={formik.handleSubmit}>
      <StyledTextField
        multiline
        className="font-kyiv"
        label="Header"
        type="text"
        name="header"
        error={Boolean(formik.errors.header) || formik.errors.header === ""}
        helperText={formik.errors.header ? formik.errors.header : ""}
        onChange={formik.handleChange}
        value={formik.values.header}
        disabled={isLoading}
      />
      <StyledTextField
        multiline
        label="Content"
        type="text"
        name="content"
        error={Boolean(formik.errors.content) || formik.errors.content === ""}
        helperText={formik.errors.content ? formik.errors.content : ""}
        onChange={formik.handleChange}
        value={formik.values.content}
        disabled={isLoading}
      />
      <div className="flex items-center">
        <Checkbox color="primary" />
        <p>Private</p>
      </div>
      <div className="flex items-center justify-between">
        <Link href="/auth/store">
          <StyledButton variant="outlined" className="w-[93px]">
            Cancel
          </StyledButton>
        </Link>
        <StyledButton variant="contained" type="submit" className="w-[73px]">
          Post
        </StyledButton>
      </div>
    </form>
  );
};

export default CreateStore;
