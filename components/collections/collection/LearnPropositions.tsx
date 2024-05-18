// usePathname needs CSR
"use client";

// external imports
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

// internal imports
import { Link, usePathname } from "@/modules/internationalization/navigation";
import { PropositionTexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import FormWrapper from "../../wrappers/FormWrapper";
import Portal from "../../wrappers/Portal";

// Props for element
type Props = {
  handleClose: () => void;
  texts: PropositionTexts;
};

const LearnPropositions = ({ texts, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <Portal>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut" }}
        key={"Modal"}
        className="fixed top-[70px] w-screen h-screen bg-blue-marguerite-500 dark:bg-black z-10 text-white flex items-center pb-[70px] px-phone sm:px-tablet md:px-pc"
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
              <StyledButton className="w-full">
                {texts.textExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/quiz`}>
              <StyledButton className="w-full">
                {texts.quizExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/cards`}>
              <StyledButton className="w-full">
                {texts.cardsExercise}
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/aiTalk`}>
              <StyledButton className="w-full">AI</StyledButton>
            </Link>
            <StyledButton>...</StyledButton>
          </div>
        </FormWrapper>
      </motion.div>
    </Portal>
  );
};

export default LearnPropositions;
