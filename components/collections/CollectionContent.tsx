// useState CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CircularProgress } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// internal imports
import Comment from "./Comment";
import ColumnStatistic from "./statistic/Column";
import PieStatistic from "./statistic/Pie";
import LearnPropositions from "@/components/LearnPropositions";
import useScrollBlock from "@/modules/hooks/useScrollBlock";
import StyledButton from "@/ui/Button";
import FavoriteButton from "@/ui/FavoriteButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import CommentSection from "./CommentSection";

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

const CollectionContent = ({
  texts,
  ...props
}: Texts & { collectionId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [heading, setHeading] = useState("");
  const [comments, setComments] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // state ro check is modal open

  const [blockScroll, allowScroll] = useScrollBlock();

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    if (isModalOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  async function fetchCollection() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8876/api/v1/collections/1");

      setHeading(res.data.data[0].name);
      setComments(res.data.data[1]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  const addCollection = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8876/api/v1/users/${user.id}/startCollection/${props.collectionId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <CircularProgress color="primary" />
    </div>
  ) : (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="w-screen h-[230px] sm:h-[374px] flex flex-col justify-center items-center gap-[10px] text-center bg-blue-marguerite-500">
        <h1 className=" w-full text-white text-h2 sm:text-h1">{heading}</h1>
        <StyledButton
          variant="contained"
          onClick={() => {
            addCollection();
            setIsModalOpen(true);
          }}
        >
          {texts.start}
        </StyledButton>
      </div>
      <div className="px-phone md:px-tablet lg:px-pc mt-[16px]">
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
      <CommentSection
        fetchCollection={fetchCollection}
        userId={user.id ? user.id.toString() : ""}
        comments={comments}
      />
    </div>
  );
};

export default CollectionContent;
