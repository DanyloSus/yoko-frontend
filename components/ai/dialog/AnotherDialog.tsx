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

const AnotherjustDialogContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

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
      }
    },
  });

  const handleClose = async () => {
    try {
      const res = await axios.post("/api/ai/justDialog", {
        messages: [
          ...messages,
          {
            message: { role: "user", content: "Write user's mistakes" },
          },
        ],
      });

      setMessages((state) => [...state, res.data.message]);
    } catch (error) {
      console.log(error);
    }
  };

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
        <StyledButton variant="contained" color="error" onClick={handleClose}>
          STOP
        </StyledButton>
      </form>
    </div>
  );
};

export default AnotherjustDialogContent;
