"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
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

type Props = {
  params: {
    id: string;
  };
};

const DialogContent = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [words, setWords] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFirstQuestion() {
      try {
        let res = await axios.get(
          `http://localhost:8876/api/v1/collections/${props.params.id}`
        );

        const words = res.data.data[0].words;

        setWords(words);

        res = await axios.post("/api/ai/dialog", { words: words });

        setMessages([res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFirstQuestion();
  }, [props.params.id]);

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

        let res;

        if (messages.length + 2 >= 10) {
          res = await axios.post("/api/ai/dialog", {
            words: words,
            messages: [
              ...messages,
              {
                message: {
                  role: "user",
                  content: `${value.prompt} After this message write some statistic about user's mistakes`,
                },
              },
            ],
          });
        } else {
          res = await axios.post("/api/ai/dialog", {
            words: words,
            messages: [
              ...messages,
              {
                message: { role: "user", content: value.prompt },
              },
            ],
          });
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
    <div>
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

      <form
        onSubmit={formik.handleSubmit}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 py-3 flex items-center w-full  px-phone md:px-tablet lg:px-pc bg-white border-t-2 border-light-grey shadow-md"
      >
        <div className="w-full relative">
          {messages.length === 1 ? (
            <p className="text-label opacity-50 absolute -top-12">
              remember, the more you write, the better the result will be*
            </p>
          ) : null}
          <StyledTextField
            multiline
            label="Your answer"
            type="text"
            name="prompt"
            error={Boolean(formik.errors.prompt) || formik.errors.prompt === ""}
            helperText={formik.errors.prompt ? formik.errors.prompt : ""}
            onChange={formik.handleChange}
            value={formik.values.prompt}
            className="w-full"
            disabled={isLoading}
          />
        </div>
        <StyledButton type="submit" disabled={isLoading}>
          Send
        </StyledButton>
      </form>
    </div>
  );
};

export default DialogContent;
