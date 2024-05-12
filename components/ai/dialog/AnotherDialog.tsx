"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

type Message = {
  index: number;
  message: {
    role: "assistant" | "user";
    content: string;
  };
};

const AnotherjustDialogContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stopped, setStopped] = useState(false);

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
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

        console.log([
          ...messages,
          {
            message: { role: "user", content: value.prompt },
          },
        ]);

        const res = await axios.post("/api/ai/justDialog", {
          messages: [
            ...messages,
            {
              message: { role: "user", content: value.prompt },
            },
          ],
        });

        setMessages((state) => [...state, res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/ai/justDialog", {
        messages: [
          ...messages,
          {
            message: { role: "user", content: "Write user's mistakes" },
          },
        ],
      });

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
                  {message.message.role === "assistant" ? "AI" : "You"}
                </h6>
                <p className="whitespace-pre-line">{message.message.content}</p>
              </div>
            ))
          : null}

        {!messages.length ? (
          <p className="text-label opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-phone md:px-tablet lg:px-pc">
            Start a dialog with the bot on a topic
            <br /> After five messages, click on the STOP button to get your
            mistakes
          </p>
        ) : null}

        <form
          onSubmit={formik.handleSubmit}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 py-3 flex flex-col gap-3 items-end w-full  px-phone md:px-tablet lg:px-pc bg-white border-t-2 dark:bg-black dark:border-dark-grey border-light-grey shadow-md"
        >
          <div className="w-full relative">
            {messages.length === 2 ? (
              <p className="text-label opacity-50 absolute -top-12">
                remember, the more you write, the better the result will be*
              </p>
            ) : null}
            <StyledTextField
              multiline
              label="Your message"
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
              placeholder="Let's start to talk about..."
            />
          </div>
          <div className="flex w-full justify-between">
            <StyledButton
              disabled={isLoading || messages.length < 5 || stopped}
              onClick={handleClose}
              color="error"
              variant="contained"
            >
              STOP
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={isLoading || stopped}
            >
              Send
            </StyledButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default AnotherjustDialogContent;
