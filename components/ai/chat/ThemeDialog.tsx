// hooks need CSR
"use client";

// external imports
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// internal imports
import { Store } from "@/modules/redux/store";
import { Message, Word } from "@/modules/types/elements";
import {
  ChatGptResponse,
  TextExerciseResponse,
} from "@/modules/types/responses";
import { AIErrors, AITexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";

type Props = {
  params: {
    id: string;
  };
  texts: AITexts;
  errors: AIErrors;
};

const ThemeDialog = ({ texts, errors, ...props }: Props) => {
  // state for user's and gpt messages
  const [messages, setMessages] = useState<Message[]>([]);
  // state for words which will be sent to ChatGPT
  const [words, setWords] = useState<Word[]>();
  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // fetch first ChatGPT's question
  useEffect(() => {
    async function fetchFirstQuestion() {
      try {
        // get words from collection
        const resWords: TextExerciseResponse = await axios.get(
          `/api/collection/${props.params.id}/exercises/text`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // get words
        let words = resWords.data.data.words;

        // shuffle words
        for (let i = words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [words[i], words[j]] = [words[j], words[i]];
        }

        // set words
        setWords(words);

        // send words to ChatGPT
        const res = await axios.post("/api/ai/dialog", {
          words: words.slice(0, 5),
        });

        // set ChatGPT's answer
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
        // set user's message to messages
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

        // variable for ChatGPT answer
        let res: ChatGptResponse;

        // if message equal 8
        if (messages.length + 2 >= 10) {
          // get user's mistakes
          res = await axios.post("/api/ai/dialog", {
            words: words,
            messages: [
              ...messages,
              {
                message: {
                  role: "user",
                  // send additional text because
                  // ChatGPT doesn't understand without
                  content: `${value.prompt} After this message write some statistic about user's mistakes`,
                },
              },
            ],
          });
        } else {
          // get regular ChatGPT answer
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

        // set ChatGPT's answer to messages
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
                {message.message.role === "assistant" ? texts.ai : texts.you}
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
              {texts.hint}
            </p>
          ) : null}
          <StyledTextField
            multiline
            label={texts.message}
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
          {texts.send}
        </StyledButton>
      </form>
    </div>
  );
};

export default ThemeDialog;
