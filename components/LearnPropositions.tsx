import React from "react";
import Portal from "./wrappers/Portal";
import FormWrapper from "./wrappers/FormWrapper";
import StyledButton from "@/ui/Button";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  handleClose: () => void;
};

const LearnPropositions = (props: Props) => {
  const pathname = usePathname();

  return (
    <Portal>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut" }}
        key={"Modal"}
        className="absolute top-[70px] w-screen h-screen bg-blue-marguerite-500 z-10 text-white flex items-center  pb-[70px] px-pc"
      >
        <ArrowBackIcon
          className="absolute text-white top-0 w-[48px] h-[48px] cursor-pointer"
          onClick={props.handleClose}
        />
        <FormWrapper title="Choose method">
          <div className="max-w-[377px] w-full flex flex-col gap-[24px]">
            <Link href={`${pathname}/exercise/text`}>
              <StyledButton variant="contained" className="w-full">
                Text
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/quiz`}>
              <StyledButton variant="contained" className="w-full">
                Quiz
              </StyledButton>
            </Link>
            <Link href={`${pathname}/exercise/cards`}>
              <StyledButton variant="contained" className="w-full">
                Flash Card
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
