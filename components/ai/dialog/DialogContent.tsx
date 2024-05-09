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

  useEffect(() => {
    async function fetchFirstQuestion() {
      let res = await axios.get(
        `http://localhost:8876/api/v1/collections/${props.params.id}`
      );

      console.log(res.data);

      const words = res.data.data[0].words;

      setWords(words);

      res = await axios.post("/api/ai/dialog", { words: words });

      setMessages([res.data.message]);

      console.log(res.data.message);
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
      }
    },
  });

  return (
    <div>
      {messages.length
        ? messages.map((message, index) => (
            <div key={index}>
              <p>{message.message.role}</p>
              <p className="whitespace-pre-line">{message.message.content}</p>
            </div>
          ))
        : null}

      <form onSubmit={formik.handleSubmit}>
        <StyledTextField
          multiline
          label="Your answer"
          type="text"
          name="prompt"
          error={Boolean(formik.errors.prompt) || formik.errors.prompt === ""}
          helperText={formik.errors.prompt ? formik.errors.prompt : ""}
          onChange={formik.handleChange}
          value={formik.values.prompt}
        />
        <StyledButton type="submit">Send</StyledButton>
      </form>
    </div>
  );
};

export default DialogContent;
