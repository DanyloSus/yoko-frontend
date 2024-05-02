"use client";

import StyledButton from "@/ui/Button";
import React, { useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteButton from "@/ui/FavoriteButton";
import LearnPropositions from "@/components/LearnPropositions";
import { AnimatePresence, motion } from "framer-motion";

const CollectionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartToLearn = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-screen h-[374px] flex flex-col justify-center items-center gap-[10px] text-center bg-blue-marguerite-500">
        <h1 className="max-w-[1177px] w-full text-white text-h1">Collection</h1>
        <StyledButton variant="contained" onClick={handleStartToLearn}>
          Start To Learn
        </StyledButton>
      </div>
      <div className="px-pc mt-[16px]">
        <div className="flex items-center justify-end gap-[10px] text-dark-grey">
          <div className="flex items-center gap-[4px]">
            <p className="text-label">999m. Likes</p>
            <ThumbUpAltOutlinedIcon sx={{ width: "36px", height: "36px" }} />
          </div>
          <div className="flex items-center gap-[4px]">
            <p className="text-label">3m. Views</p>
            <VisibilityOutlinedIcon sx={{ width: "36px", height: "36px" }} />
          </div>
          <FavoriteButton />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen ? (
          <LearnPropositions handleClose={handleCloseModal} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default CollectionPage;
