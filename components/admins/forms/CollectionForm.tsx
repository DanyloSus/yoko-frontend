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
import ImageModal from "./ImageModal";

type CollectionFormProps = {
  params: { id: string };
};

type Collection = {
  bannerUrl: string;
  id: number;
  name: string;
  posterUrl: string;
  text: string;
  status: "pending" | "private" | "public";
  translationUk: string;
};

const CollectionForm = ({ params }: CollectionFormProps) => {
  const [collection, setCollection] = useState<Collection>();
  const [toStatus, setToStatus] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchCollection() {
      const res = await axios.get(
        `http://54.92.220.133:8876/api/v1/collections/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const collectionData: Collection = res.data.data;

      setCollection(collectionData);
      setToStatus(collectionData.status);

      formik.setValues({
        name: collectionData.name,
        text: collectionData.text,
        translationUk: collectionData.translationUk,
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
      translationUk: "",
    },
    // validation
    validationSchema: Yup.object({
      name: Yup.string().required(),
      text: Yup.string().required(),
      translationUk: Yup.string().required(),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      const data = {
        ...value,
        status: toStatus,
      };
      await axios.patch(
        `http://54.92.220.133:8876/api/v1/collections/${collection!.id}`,
        data,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      router.push("/admin/collections");
    },
  });

  return !collection ? (
    <></>
  ) : (
    <div className="w-full flex justify-center items-center">
      <form>
        <FormWrapper title="Update Collection" removeBorder isDark>
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
            name="translationUk"
            error={
              Boolean(formik.errors.translationUk) ||
              formik.errors.translationUk === ""
            }
            helperText={
              formik.errors.translationUk ? formik.errors.translationUk : ""
            }
            onChange={formik.handleChange}
            value={formik.values.translationUk}
          />
          <div className="flex justify-between items-center w-full">
            <StyledButton
              variant="contained"
              onClick={() => {
                setImageUrl(collection.bannerUrl);
                setModal(true);
              }}
            >
              Banner
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                setImageUrl(collection.posterUrl);
                setModal(true);
              }}
            >
              Poster
            </StyledButton>
            <div />
            <ImageModal
              url={imageUrl}
              handleClose={() => setModal(false)}
              open={modal}
            />
          </div>
          <div className="flex justify-between w-full">
            <StyledButton
              variant="contained"
              onClick={() => {
                if (collection.status === "pending") {
                  setToStatus("private");
                  formik.handleSubmit();
                }
              }}
              color="error"
            >
              {collection.status === "pending" ? "Discard" : "Delete"}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                if (collection.status === "pending") {
                  setToStatus("public");
                }
                formik.handleSubmit();
              }}
            >
              {collection.status === "pending" ? "Public" : "Confirm"}
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default CollectionForm;
