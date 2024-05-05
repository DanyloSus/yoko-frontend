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
    <div>
      <div className="w-screen h-[374px] flex flex-col justify-center items-center gap-[10px] text-center bg-blue-marguerite-500">
        <h1 className="max-w-[1177px] w-full text-white text-h1">Collection</h1>
        <StyledButton variant="contained" onClick={() => setIsModalOpen(true)}>
          {texts.start}
        </StyledButton>
      </div>
      <div className="px-pc mt-[16px]">
        <div className="flex items-center justify-end gap-[10px] text-dark-grey">
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
      </div>
      <AnimatePresence>
        {isModalOpen ? (
          <LearnPropositions
            texts={texts}
            handleClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default CollectionContent;
