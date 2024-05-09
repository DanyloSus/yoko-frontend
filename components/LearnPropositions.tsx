// usePathname needs CSR
"use client";

// external imports
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

// internal imports
import FormWrapper from "./wrappers/FormWrapper";
import Portal from "./wrappers/Portal";
import StyledButton from "@/ui/Button";

// Props for element
type Props = {
  handleClose: () => void;
};

type Texts = {
  texts: {
    propositionHeading: string;
    textExercise: string;
    quizExercise: string;
    cardsExercise: string;
  };
};

const LearnPropositions = ({ texts, ...props }: Props & Texts) => {
  const pathname = usePathname();

  return (
    <Portal>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut" }}
        key={"Modal"}
        className="fixed top-[70px] w-screen h-screen bg-blue-marguerite-500 z-10 text-white flex items-center pb-[70px] px-phone sm:px-tablet md:px-pc"
      >
        {/* Button for closing modal */}
        <ArrowBackIcon
          className="absolute text-white top-0 w-[48px] h-[48px] cursor-pointer"
          onClick={props.handleClose}
        />
        <FormWrapper title={texts.propositionHeading}>
          <div className="max-w-[377px] w-full flex flex-col gap-[24px]">
            {/* List of varianst to learn */}
            <Link href={`${pathname}/exercise/text`}>
              <StyledButton variant="contained" className="w-full">
                {texts.textExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/quiz`}>
              <StyledButton variant="contained" className="w-full">
                {texts.quizExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/cards`}>
              <StyledButton variant="contained" className="w-full">
                {texts.cardsExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/aiTalk`}>
              <StyledButton variant="contained" className="w-full">
                AI
              </StyledButton>
            </Link>
            <StyledButton variant="contained">...</StyledButton>
          </div>
        </FormWrapper>
      </motion.div>
    </Portal>
  );
};

export default LearnPropositions;
