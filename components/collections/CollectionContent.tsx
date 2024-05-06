// useState CSR
"use client";

// external imports
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// internal imports
import StyledButton from "@/ui/Button";
import LearnPropositions from "@/components/LearnPropositions";
import FavoriteButton from "@/ui/FavoriteButton";
import PieStatistic from "./statistic/Pie";
import ColumnStatistic from "./statistic/Column";
import Comment from "./Comment";

type Texts = {
  texts: {
    start: string;
    likes: string;
    views: string;
    propositionHeading: string;
    textExercise: string;
    quizExercise: string;
    cardsExercise: string;
  };
};

const CollectionContent = ({ texts }: Texts) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // state ro check is modal open

  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="w-screen h-[230px] sm:h-[374px] flex flex-col justify-center items-center gap-[10px] text-center bg-blue-marguerite-500">
        <h1 className=" w-full text-white text-h2 sm:text-h1">Collection</h1>
        <StyledButton variant="contained" onClick={() => setIsModalOpen(true)}>
          {texts.start}
        </StyledButton>
      </div>
      <div className="px-phone sm:px-tablet md:px-pc mt-[16px]">
        <div className="flex items-center justify-center sm:justify-end gap-[10px] text-dark-grey text-center">
          <div className="flex items-center gap-[4px]">
            <p className="text-label">999m. {texts.likes}</p>
            <ThumbUpAltOutlinedIcon sx={{ width: "36px", height: "36px" }} />
          </div>
          <div className="flex items-center gap-[4px]">
            <p className="text-label">3m. {texts.views}</p>
            <VisibilityOutlinedIcon sx={{ width: "36px", height: "36px" }} />
          </div>
          <FavoriteButton />
        </div>
        <div className="text-center flex flex-wrap max-md:flex-col items-center justify-between gap-[20px]">
          <PieStatistic />
          <ColumnStatistic />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen ? (
          <LearnPropositions
            texts={texts}
            handleClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      <div className="flex flex-col items-center mt-[40px]">
        <h2 className="text-h3 sm:text-h2">Comments</h2>
        <hr className="border-light-grey w-full border-t-2" />
        <div className="px-phone sm:px-tablet md:px-pc flex flex-col items-center gap-[16px] mt-[16px] w-full">
          <Comment content="sdasd" name="SAdasd" />
          <Comment content="sdasd" name="SAdasd" />
          <Comment content="sdasd" name="SAdasd" />
        </div>
      </div>
    </div>
  );
};

export default CollectionContent;
