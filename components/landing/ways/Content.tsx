import TranslationBubble from "@/components/exercises/TranslationBubble";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Text from "./Text";
import Test from "./Test";
import CardExercise from "./Card";

type ContentProps = {
  page: number; //active page
};

const WaysContent = (props: ContentProps) => {
  const content = [
    {
      title: "Interactive Texts",
      text: "Immerse yourself in the language by reading texts in English and Ukrainian. Simply hover over a word for its translation, making learning seamless and efficient.",
      mobileText:
        "Immerse yourself in the language by reading texts in English and Ukrainian.",
      content: <Text />,
    },
    {
      title: "Engaging Tests",
      text: "Test your knowledge with our interactive quizzes. Choose the correct translation for words in English, reinforcing your understanding and retention.",
      mobileText: "Test your knowledge with our interactive quizzes.",
      content: <Test />,
    },
    {
      title: "Flashcards Reinvented",
      text: "Revise vocabulary effortlessly with our interactive flashcards. See the word in English, then flip the card to reveal its translation, reinforcing your memory.",
      mobileText:
        "Revise vocabulary effortlessly with our interactive flashcards.",
      content: <CardExercise />,
    },
    {
      title: "AI-Powered Tools",
      text: "Benefit from AI assistance to assess your English level. Engage in conversations with our AI chatbot to practice and receive feedback on your writing skills.",
      mobileText:
        "Benefit from AI assistance to assess your English level. Engage in conversations with our AI chatbot to practice and receive feedback on your writing skills.",
      secondTitle: "Conversational Practice",
      secondText:
        "Practice speaking with our AI, which uses words from the collections you're studying. Get real-time feedback and improve your fluency and confidence. Enhance your learning experience with our modern tools and techniques. Start your journey to language mastery today!",
      secondMobileText:
        "Practice speaking with our AI, which uses words from the collections you're studying. Get real-time feedback and improve your fluency and confidence",
      content: (
        <Link href="/ai/check">
          <StyledButton variant="contained">
            Test your english level by AI
          </StyledButton>
        </Link>
      ),
    },
  ];

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-5 justify-center items-center text-center relative"
          initial={{
            x: "-25%",
            opacity: 0,
            position: "absolute",
          }}
          animate={{
            x: 0,
            opacity: 1,
            position: "initial",
          }}
          exit={{
            x: "25%",
            opacity: 0,
            position: "absolute",
            y: "-1px",
          }}
          key={props.page}
        >
          <h3 className="text-h6 sm:text-h4">{content[props.page].title}</h3>
          <p className="max-sm:hidden max-w-[580px]">
            {content[props.page].text}
          </p>
          <p className="sm:hidden">{content[props.page].mobileText}</p>
          {content[props.page].secondTitle ? (
            <>
              <h3 className="text-h6 max-sm:hidden sm:text-h4">
                {content[props.page].secondTitle}
              </h3>
              <p className="max-sm:hidden max-w-[580px]">
                {content[props.page].secondText}
              </p>
              <p className="sm:hidden">
                {content[props.page].secondMobileText}
              </p>
            </>
          ) : null}

          {content[props.page].content}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WaysContent;
