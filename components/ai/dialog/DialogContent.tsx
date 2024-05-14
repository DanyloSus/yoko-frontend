"use client";

import { Store } from "@/modules/redux/store";
import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    async function fetchFirstQuestion() {
      try {
        let res = await axios.get(
          `http://18.212.227.5:8876/api/v1/collections/${props.params.id}/text`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        let words = res.data.data.words;

        for (let i = words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [words[i], words[j]] = [words[j], words[i]];
        }

        setWords(words);

        res = await axios.post("/api/ai/dialog", { words: words.slice(0, 5) });

        setMessages([res.data.message]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFirstQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        className="fixed bottom-0 left-1/2 -translate-x-1/2 py-3 flex flex-col items-end gap-3 w-full  px-phone md:px-tablet lg:px-pc bg-white border-t-2 border-light-grey shadow-md dark:bg-black dark:border-dark-grey"
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
        <StyledButton type="submit" variant="contained" disabled={isLoading}>
          Send
        </StyledButton>
      </form>
    </div>
  );
};

export default DialogContent;
