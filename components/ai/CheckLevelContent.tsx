"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AnswerDialog from "./AnswerDialog";
import { CircularProgress } from "@mui/material";

type Message = {
  index: number;
  message: {
    role: "assistant" | "user";
    content: string;
  };
};

export type AITexts = {
  message: string;
  startDialog: string;
  stop: string;
  send: string;
  hint: string;
  ai: string;
  placeholder: string;
  you: string;
};

export type AIErrors = {
  required: string;
};

type ContentProps = {
  texts: AITexts;
  errors: AIErrors;
};

const CheckLevelContent = ({ texts, errors, ...props }: ContentProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialog, setDialog] = useState(false);
  const [level, setLevel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFirstQuestion() {
      try {
        const res = await axios.get("/api/ai/checkLevel");

        setMessages([res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFirstQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required(errors.required),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      setIsLoading(true);
      try {
        formik.setValues({
          prompt: "",
        });

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

        const res = await axios.post("/api/ai/checkLevel", {
          messages: [
            ...messages,
            {
              message: { role: "user", content: value.prompt },
            },
          ],
        });

        if (messages.length + 2 === 9) {
          const text = res.data.message.message.content;

          const match = text.match(/(A1|A2|B1|B2|C1|C2)/);

          if (match) {
            console.log("First match found:", match[0]);

            setLevel(match[0]);
            setDialog(true);

            return;
          }
        }

        setMessages((state) => [...state, res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : null}
      <div
        className="pb-[82px]"
        style={{
          opacity: isLoading ? "0.5" : "1",
        }}
      >
        {messages.length
          ? messages.map((message) => (
              <div key={message.index}>
                <h6 className="text-h6">
                  {message.message.role === "assistant" ? texts.ai : texts.you}
                </h6>
                <p>{message.message.content}</p>
              </div>
            ))
          : null}

        <form
          onSubmit={formik.handleSubmit}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 py-3 flex flex-col items-end gap-3 w-full  px-phone md:px-tablet lg:px-pc bg-white border-t-2 dark:bg-black dark:border-dark-grey border-light-grey  shadow-md"
        >
          <div className="w-full relative">
            {messages.length === 1 ? (
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
              disabled={isLoading}
            />
          </div>
          <StyledButton type="submit" variant="contained" disabled={isLoading}>
            {texts.send}
          </StyledButton>
        </form>
        <AnswerDialog
          handleClose={() => setDialog(false)}
          level={level}
          open={dialog}
        />
      </div>
    </>
  );
};

export default CheckLevelContent;
