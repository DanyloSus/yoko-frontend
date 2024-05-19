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
import { Word } from "@/modules/types/elements";
import { WordResponse } from "@/modules/types/responses";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";

type WordFormProps = {
  params: { id: string };
  texts: FormTexts;
};

type FormTexts = {
  wordReq: string;
  transReq: string;
  update: string;
  word: string;
  ukTranslation: string;
  submit: string;
};

const WordForm = ({ texts, ...props }: WordFormProps) => {
  // state for word which will be in form
  const [word, setWord] = useState<Word>();

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to fetch word on start
  useEffect(() => {
    async function fetchWord() {
      const res: WordResponse = await axios.get(
        `/api/admin/words/${props.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // get word data
      const wordData = res.data.data;

      // set word data to state
      setWord(wordData);

      // set word data to form
      formik.setValues({
        word: wordData.word,
        translationUk: wordData.translationUk,
      });
    }

    fetchWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // router for changing page by code
  const router = useRouter();

  const formik = useFormik({
    // initial values
    initialValues: {
      word: "",
      translationUk: "",
    },
    // validation
    validationSchema: Yup.object({
      word: Yup.string().required(texts.wordReq),
      translationUk: Yup.string().required(texts.transReq),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      await axios.patch(`/api/admin/words/${word!.id}`, value, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      router.push("/admin/words");
    },
  });

  // if word isn't loaded then show nothing
  return !word ? (
    <></>
  ) : (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={formik.handleSubmit}>
        <FormWrapper title={texts.update} removeBorder isDark>
          <StyledTextField
            className="w-full"
            label={texts.word}
            type="text"
            name="word"
            error={Boolean(formik.errors.word) || formik.errors.word === ""}
            helperText={formik.errors.word ? formik.errors.word : ""}
            onChange={formik.handleChange}
            value={formik.values.word}
          />
          <StyledTextField
            className="w-full"
            label={texts.ukTranslation}
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
              {texts.submit}
            </StyledButton>
          </div>
        </FormWrapper>
      </form>
    </div>
  );
};

export default WordForm;
