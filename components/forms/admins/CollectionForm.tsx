// hooks need CSR
"use client";

// external imports
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// internal imports
import FormWrapper from "@/components/wrappers/FormWrapper";
import { useRouter } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { Collection } from "@/modules/types/elements";
import { CollectionResponse } from "@/modules/types/responses";
import { ImageModalText } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";
import ImageModal from "./ImageModal";

type CollectionFormProps = {
  params: { id: string };
  texts: FormTexts & ImageModalText;
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
  // state for saving the collection
  const [collection, setCollection] = useState<Collection>();
  // state to future state of the collection
  const [toStatus, setToStatus] = useState("");
  // checking is modal open
  const [modal, setModal] = useState(false);
  // image url to modal
  const [imageUrl, setImageUrl] = useState("");

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to fetch collection
  useEffect(() => {
    async function fetchCollection() {
      const res: CollectionResponse = await axios.get(
        `/api/admin/collections/${props.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // get collection
      const collectionData = res.data.data;

      // set the collection to state
      setCollection(collectionData);
      // set default future status
      setToStatus(collectionData.status);

      // set the collection values to form
      formik.setValues({
        name: collectionData.name,
        text: collectionData.text,
        translationUk: collectionData.translationUk,
      });
    }

    fetchCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // router for changing page by code
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
      await axios.patch(`/api/admin/collections/${collection!.id}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      router.push("/admin/collections");
    },
  });

  // show form only if the collection is ready
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
                setImageUrl(collection.bannerUrl!);
                setModal(true);
              }}
            >
              {texts.banner}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => {
                setImageUrl(collection.posterUrl!);
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
