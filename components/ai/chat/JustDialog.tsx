// hooks needs CSR
"use client";

// external imports
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// internal imports
import { Message } from "@/modules/types/elements";
import { ChatGptResponse } from "@/modules/types/responses";
import { AIErrors, AITexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";

type DialogProps = {
  texts: AITexts;
  errors: AIErrors;
};

const JustDialog = ({ texts, errors, ...props }: DialogProps) => {
  // state for user's and gpt messages
  const [messages, setMessages] = useState<Message[]>([]);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // did user stop dialog state
  const [stopped, setStopped] = useState(false);

  // formik for better form control
  const formik = useFormik({
    // initial values
    initialValues: {
      prompt: "",
    },
    // validation
    validationSchema: Yup.object({
      prompt: Yup.string().required(errors.required),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      setIsLoading(true);

      // clear form
      formik.setValues({
        prompt: "",
      });

      try {
        // set user's message
        setMessages((state) => [
          ...state,
          {
            index: state.length,
            message: {
              content: value.prompt,
              role: "user",
            },
          },
        ]);

        // ChatGPT's answer
        const res: ChatGptResponse = await axios.post("/api/ai/justDialog", {
          messages: [
            ...messages,
            {
              message: { role: "user", content: value.prompt },
            },
          ],
        });

        // set ChatGPT's answer to messages
        setMessages((state) => [...state, res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // function to stop dialog
  const handleClose = async () => {
    setIsLoading(true);
    try {
      // ChatGPT's answer
      const res: ChatGptResponse = await axios.post("/api/ai/justDialog", {
        messages: [
          ...messages,
          {
            message: { role: "user", content: "Write user's mistakes" },
          },
        ],
      });

      // set answer to messages
      setMessages((state) => [...state, res.data.message]);
      setStopped(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : null}
      <div
        className="pb-[128px]"
        style={{
          opacity: isLoading ? "0.5" : "1",
        }}
      >
        {messages.length
          ? messages.map((message, index) => (
              <div key={index}>
                <h6 className="text-h6">
                  {message.message.role === "assistant" ? texts.ai : texts.you}
                </h6>
                <p className="whitespace-pre-line">{message.message.content}</p>
              </div>
            ))
          : null}

        {!messages.length ? (
          <p className="text-label opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-phone md:px-tablet lg:px-pc whitespace-pre-line">
            {texts.startDialog}
          </p>
        ) : null}

        <form
          onSubmit={formik.handleSubmit}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 py-3 flex flex-col gap-3 items-end w-full  px-phone md:px-tablet lg:px-pc bg-white border-t-2 dark:bg-black dark:border-dark-grey border-light-grey shadow-md"
        >
          <div className="w-full relative">
            {messages.length === 2 ? (
              <p className="text-label opacity-50 absolute -top-12">
                {texts.hint}
              </p>
            ) : null}
            <StyledTextField
              multiline
              label={texts.message}
              type="text"
              name="prompt"
              error={
                Boolean(formik.errors.prompt) || formik.errors.prompt === ""
              }
              helperText={formik.errors.prompt ? formik.errors.prompt : ""}
              onChange={formik.handleChange}
              value={formik.values.prompt}
              className="w-full"
              disabled={isLoading || stopped}
              placeholder={texts.placeholder}
            />
          </div>
          <div className="flex w-full justify-between">
            <StyledButton
              disabled={isLoading || messages.length < 5 || stopped}
              onClick={handleClose}
              color="error"
              variant="contained"
            >
              {texts.stop}
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={isLoading || stopped}
            >
              {texts.send}
            </StyledButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default JustDialog;
