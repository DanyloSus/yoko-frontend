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

type WordFormProps = {
  params: { id: string };
};

type Word = {
  id: number;
  word: string;
  translationUk: string;
};

const WordForm = ({ params }: WordFormProps) => {
  const [word, setWord] = useState<Word>();

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchWord() {
      const res = await axios.get(
        `http://localhost:8876/api/v1/words/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const wordData: Word = res.data.data;

      setWord(wordData);

      formik.setValues({
        word: wordData.word,
        translationUk: wordData.translationUk,
      });
    }

    fetchWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const formik = useFormik({
    // initial values
    initialValues: {
      word: "",
      translationUk: "",
    },
    // validation
    validationSchema: Yup.object({
      word: Yup.string().required(),
      translationUk: Yup.string().required(),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      await axios.patch(
        `http://localhost:8876/api/v1/words/${word!.id}`,
        value
      );
      router.push("/admin/words");
    },
  });

  return !word ? (
    <></>
  ) : (
    <div className="w-full flex justify-center items-center">
      <form onClick={formik.handleSubmit}>
        <FormWrapper title="Update Word" removeBorder isDark>
          <StyledTextField
            className="w-full"
            label="Word"
            type="text"
            name="word"
            error={Boolean(formik.errors.word) || formik.errors.word === ""}
            helperText={formik.errors.word ? formik.errors.word : ""}
            onChange={formik.handleChange}
            value={formik.values.word}
          />
          <StyledTextField
            className="w-full"
            label="Ukrainian Translation"
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
          <div className="flex justify-end w-full">
            <StyledButton variant="contained" type="submit">
              Submit
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default WordForm;
