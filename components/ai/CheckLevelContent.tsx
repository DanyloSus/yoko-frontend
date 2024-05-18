// hooks needs CSR
"use client";

// external imports
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// internal imports
import { Message } from "@/modules/types/elements";
import { ChatGptResponse } from "@/modules/types/responses";
import { AIErrors, AITexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";
import CheckDialog from "./CheckDialog";

type ContentProps = {
  texts: AITexts;
  errors: AIErrors;
};

const CheckLevelContent = ({ texts, errors, ...props }: ContentProps) => {
  // state for user's and gpt messages
  const [messages, setMessages] = useState<Message[]>([]);
  // is dialog open state
  const [dialog, setDialog] = useState(false);
  // state for level which needs to show
  const [level, setLevel] = useState("");
  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // use effect to fetch first question from ChatGPT
  useEffect(() => {
    async function fetchFirstQuestion() {
      try {
        // get answer from ChatGPT
        const res: ChatGptResponse = await axios.get("/api/ai/checkLevel");

        // set to messages state
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

      // clean form
      formik.setValues({
        prompt: "",
      });

      try {
        // add user's message
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

        // ChatGPT answer
        const res: ChatGptResponse = await axios.post("/api/ai/checkLevel", {
          messages: [
            ...messages,
            {
              message: { role: "user", content: value.prompt },
            },
          ],
        });

        // if messages length more than 8
        if (messages.length + 2 >= 9) {
          // get ChatGPT answer
          const text = res.data.message.message.content;

          // find user's level in ChatGPT answer
          const match = text.match(/(A1|A2|B1|B2|C1|C2)/);

          if (match) {
            // set to first found level
            setLevel(match[0]);
            setDialog(true);

            return;
          }
        }

        // write to message
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
        <CheckDialog
          handleClose={() => setDialog(false)}
          level={level}
          open={dialog}
        />
      </div>
    </>
  );
};

export default CheckLevelContent;
