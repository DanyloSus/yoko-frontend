"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AnswerDialog from "./AnswerDialog";

type Message = {
  index: number;
  message: {
    role: "assistant" | "user";
    content: string;
  };
};

const CheckLevelContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dialog, setDialog] = useState(false);
  const [level, setLevel] = useState("");

  useEffect(() => {
    async function fetchFirstQuestion() {
      const res = await axios.get("/api/ai/checkLevel");

      setMessages([res.data.message]);

      console.log(res.data.message);
    }

    fetchFirstQuestion();
  }, []);

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
      }
    },
  });

  return (
    <div>
      {messages.length
        ? messages.map((message) => (
            <div key={message.index}>
              <p>{message.message.role}</p>
              <p>{message.message.content}</p>
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
      <AnswerDialog
        handleClose={() => setDialog(false)}
        level={level}
        open={dialog}
      />
    </div>
  );
};

export default CheckLevelContent;
