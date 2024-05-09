"use client";

import FormWrapper from "@/components/wrappers/FormWrapper";
import { useRouter } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

type CollectionFormProps = {
  params: { id: string };
};

const CollectionForm = ({ params }: CollectionFormProps) => {
  const [status, setStatus] = useState("pending");
  const [toStatus, setToStatus] = useState("pending");
  const [id, setId] = useState();

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchCollection() {
      const res = await axios.get(
        `http://localhost:8876/api/v1/collections/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setStatus(res.data.data.status);
      setId(res.data.data.id);

      formik.setValues({
        name: res.data.data.name,
        text: res.data.data.name,
        text_uk: res.data.data.name,
      });
    }

    fetchCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const formik = useFormik({
    // initial values
    initialValues: {
      name: "",
      text: "",
      text_uk: "",
    },
    // validation
    validationSchema: Yup.object({
      name: Yup.string().required(),
      text: Yup.string().required(),
      text_uk: Yup.string().required(),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      if (status === "pending") {
        await axios.patch(
          `http://localhost:8876/api/v1/collections/changeStatus/${id}`,
          {
            status: toStatus,
          }
        );
      }
      router.push("/admin/collections");
    },
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <form>
        <FormWrapper title="Update User" removeBorder isDark>
          <StyledTextField
            multiline
            className="font-kyiv w-full"
            label="Header"
            type="text"
            name="name"
            error={Boolean(formik.errors.name) || formik.errors.name === ""}
            helperText={formik.errors.name ? formik.errors.name : ""}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <StyledTextField
            multiline
            className="w-full"
            label="English text"
            type="text"
            name="text"
            error={Boolean(formik.errors.text) || formik.errors.text === ""}
            helperText={formik.errors.text ? formik.errors.text : ""}
            onChange={formik.handleChange}
            value={formik.values.text}
          />
          <StyledTextField
            multiline
            className="w-full"
            label="Ukrainian text"
            type="text"
            name="text"
            error={Boolean(formik.errors.text) || formik.errors.text === ""}
            helperText={formik.errors.text ? formik.errors.text : ""}
            onChange={formik.handleChange}
            value={formik.values.text}
          />
          <div className="flex justify-between w-full">
            <StyledButton
              variant="contained"
              onClick={() => {
                if (status === "pending") {
                  setToStatus("private");
                  formik.handleSubmit();
                }
                router.push("/admin/collections");
              }}
              color="error"
            >
              {status === "pending" ? "Discard" : "Delete"}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                if (status === "pending") {
                  setToStatus("public");
                }
                formik.handleSubmit();
              }}
            >
              {status === "pending" ? "Public" : "Confirm"}
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default CollectionForm;
