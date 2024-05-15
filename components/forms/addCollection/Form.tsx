// hooks needs CSR
"use client";

// external imports
import React, { useState, useRef, LegacyRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Checkbox, CircularProgress } from "@mui/material";
import * as Yup from "yup";

// internal imports
import { Link, useRouter } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";

type Texts = {
  texts: {
    name: string;
    text: string;
    private: string;
    cancel: string;
    post: string;
    poster: string;
    posterHint: string;
    banner: string;
    bannerHint: string;
    color: string;
  };
  errors: {
    nameRequired: string;
    textRequired: string;
    posterRequired: string;
    bannerRequired: string;
    colorRequired: string;
    something: string;
  };
};

const CreateStore = ({ texts, errors }: Texts) => {
  const [isLoading, setIsLoading] = useState(false); // state for checking is form loading
  const [isPrivate, setIsPrivate] = useState(false); // state for private checkbox

  console.log(errors);

  const posterRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const user = useSelector((state: Store) => state.user);

  // router for changing page by code
  const router = useRouter();

  // formik for better form control
  const formik = useFormik({
    // initial values
    initialValues: {
      name: "",
      text: "",
      poster: null,
      banner: null,
      color: "",
    },
    // validation
    validationSchema: Yup.object({
      name: Yup.string().required(errors.nameRequired),
      text: Yup.string().required(errors.textRequired),
      poster: Yup.mixed().required(errors.posterRequired),
      banner: Yup.mixed().required(errors.bannerRequired),
      color: Yup.string().required(errors.colorRequired),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      setIsLoading(true);

      // create data var and set to its form values and checkbox state
      const data = {
        name: value.name,
        text: value.text,
        status: isPrivate ? "private" : "pending",
        userId: user.id,
        poster: posterRef.current!.files![0] as File,
        banner: bannerRef.current!.files![0] as File,
        color: value.color,
      };

      try {
        // post collection
        await axios.post("http://18.212.227.5:8876/api/v1/collections", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        });
        router.push(`/authed/thanks?is=${isPrivate ? "private" : "pending"}`);
      } catch (error) {
        console.log(error);
        formik.setFieldError("color", errors.something);
      } finally {
        // go to thank's page where we have query
        // query depends is collection private
        setIsLoading(false);
      }
    },
  });

  return (
    <form className="flex flex-col gap-[20px]" onSubmit={formik.handleSubmit}>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <CircularProgress color="primary" />
        </div>
      ) : null}
      <StyledTextField
        multiline
        className="font-kyiv"
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
        multiline
        label={texts.text}
        type="text"
        color="primary"
        name="text"
        error={Boolean(formik.errors.text) || formik.errors.text === ""}
        helperText={formik.errors.text ? formik.errors.text : ""}
        onChange={formik.handleChange}
        value={formik.values.text}
        disabled={isLoading}
      />
      <div className="flex flex-col items-start">
        <input
          type="file"
          ref={posterRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            formik.setFieldValue("poster", e.currentTarget.files![0]);
          }}
          disabled={isLoading}
        />
        <StyledButton
          onClick={() => posterRef.current!.click()}
          variant={formik.values.poster ? "contained" : "text"}
          color={formik.errors.poster ? "error" : "secondary"}
          disabled={isLoading}
        >
          {texts.poster}
        </StyledButton>
        <p className="text-label opacity-50">{texts.posterHint}</p>
        {formik.errors.poster ? (
          <p className="text-label text-error">{formik.errors.poster}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-start">
        <input
          type="file"
          ref={bannerRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            formik.setFieldValue("banner", e.currentTarget.files![0]);
          }}
          disabled={isLoading}
        />
        <StyledButton
          onClick={() => bannerRef.current!.click()}
          color={formik.errors.banner ? "error" : "secondary"}
          variant={formik.values.banner ? "contained" : "text"}
          disabled={isLoading}
        >
          {texts.banner}
        </StyledButton>
        <p className="text-label opacity-50">{texts.bannerHint}</p>
        {formik.errors.banner ? (
          <p className="text-label text-error">{formik.errors.banner}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-label">{texts.color}</p>
        <div className="flex gap-[10px]">
          {["6D64E8", "C8102E", "FF8811"].map((color, index) => (
            <div
              key={index}
              className="rounded-full w-[48px] h-[48px] cursor-pointer"
              style={{
                backgroundColor: `#${color}`,
                border:
                  formik.values.color === color ? "2px solid #4D47A5" : "",
              }}
              onClick={() =>
                !isLoading ? formik.setFieldValue("color", color) : null
              }
            />
          ))}
        </div>
        {formik.errors.color ? (
          <p className="text-label text-error">{formik.errors.color}</p>
        ) : null}
      </div>
      <div className="flex items-center">
        <Checkbox
          color="primary"
          value={isPrivate}
          disabled={isLoading}
          onChange={() => setIsPrivate((state) => !state)}
          className="dark:text-white"
        />
        <p>{texts.private}</p>
      </div>
      <div className="flex items-center justify-between">
        {isLoading ? (
          <StyledButton variant="outlined" disabled className="w-[93px]">
            {texts.cancel}
          </StyledButton>
        ) : (
          <Link href="/authed/store">
            <StyledButton variant="outlined" className="w-[93px]">
              {texts.cancel}
            </StyledButton>
          </Link>
        )}
        <StyledButton variant="contained" type="submit" disabled={isLoading}>
          {texts.post}
        </StyledButton>
      </div>
    </form>
  );
};

export default CreateStore;
