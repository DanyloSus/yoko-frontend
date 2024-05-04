"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

const CreateStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      text: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      text: Yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      setIsLoading(true);

      const data = {
        ...value,
        status: isPrivate ? "private" : "pending",
      };

      try {
        await axios.post("http://localhost:8876/api/v1/collections", data);
      } catch (error) {
        console.log(error);
      } finally {
        router.push(`/auth/thanks?is=${isPrivate ? "private" : "pending"}`);
        setIsLoading(false);
      }
    },
  });

  return (
    <form className="flex flex-col gap-[20px]" onSubmit={formik.handleSubmit}>
      <StyledTextField
        multiline
        className="font-kyiv"
        label="Header"
        type="text"
        name="name"
        error={Boolean(formik.errors.name) || formik.errors.name === ""}
        helperText={formik.errors.name ? formik.errors.name : ""}
        onChange={formik.handleChange}
        value={formik.values.name}
        disabled={isLoading}
      />
      <StyledTextField
        multiline
        label="Content"
        type="text"
        name="text"
        error={Boolean(formik.errors.text) || formik.errors.text === ""}
        helperText={formik.errors.text ? formik.errors.text : ""}
        onChange={formik.handleChange}
        value={formik.values.text}
        disabled={isLoading}
      />
      <div className="flex items-center">
        <Checkbox
          color="primary"
          value={isPrivate}
          onChange={() => setIsPrivate((state) => !state)}
        />
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
