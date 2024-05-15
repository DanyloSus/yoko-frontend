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
import ImageModal, { ImageModalText } from "./ImageModal";

type CollectionFormProps = {
  params: { id: string };
  texts: FormTexts & ImageModalText;
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

type FormTexts = {
  update: string;
  nameReq: string;
  textReq: string;
  transReq: string;
  header: string;
  enText: string;
  ukText: string;
  banner: string;
  poster: string;
  discard: string;
  private: string;
  public: string;
  publicButton: string;
  confirm: string;
};

const CollectionForm = ({ texts, ...props }: CollectionFormProps) => {
  const [collection, setCollection] = useState<Collection>();
  const [toStatus, setToStatus] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchCollection() {
      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/${props.params.id}`,
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
      name: Yup.string().required(texts.nameReq),
      text: Yup.string().required(texts.textReq),
      translationUk: Yup.string().required(texts.transReq),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      const data = {
        ...value,
        status: toStatus,
      };
      await axios.patch(
        `http://18.212.227.5:8876/api/v1/collections/${collection!.id}`,
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
        <FormWrapper title={texts.update} removeBorder isDark>
          <StyledTextField
            multiline
            className="font-kyiv w-full"
            label={texts.header}
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
            label={texts.enText}
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
            label={texts.ukText}
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
              {texts.banner}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                setImageUrl(collection.posterUrl);
                setModal(true);
              }}
            >
              {texts.poster}
            </StyledButton>
            <div />
            <ImageModal
              texts={{
                modalClose: texts.modalClose,
                modalTitle: texts.modalTitle,
              }}
              url={imageUrl}
              handleClose={() => setModal(false)}
              open={modal}
            />
          </div>
          <div className="flex justify-between w-full">
            <StyledButton
              variant="contained"
              onClick={() => {
                if (
                  collection.status === "pending" ||
                  collection.status === "public"
                ) {
                  setToStatus("private");
                  formik.handleSubmit();
                } else {
                  setToStatus("public");
                  formik.handleSubmit();
                }
              }}
              color={collection.status === "private" ? "primary" : "error"}
            >
              {collection.status === "pending"
                ? texts.discard
                : collection.status === "public"
                ? texts.private
                : texts.public}
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
              {collection.status === "pending"
                ? texts.publicButton
                : texts.confirm}
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default CollectionForm;

//admin@admin.com
// password

//danylo@sus
//sussussus
