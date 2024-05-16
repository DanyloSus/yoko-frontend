// useState CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CircularProgress } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// internal imports
import ColumnStatistic from "./statistic/Column";
import PieStatistic from "./statistic/Pie";
import LearnPropositions from "@/components/collections/LearnPropositions";
import useScrollBlock from "@/modules/hooks/useScrollBlock";
import StyledButton from "@/ui/Button";
import FavoriteButton from "@/components/collections/FavoriteButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import CommentSection, {
  CommentSectionErrors,
  CommentSectionTexts,
} from "./CommentSection";

type Texts = {
  start: string;
  likes: string;
  views: string;
  propositionHeading: string;
  textExercise: string;
  quizExercise: string;
  cardsExercise: string;
  error: string;
};

type Collection = {
  id: number;
  name: string;
  bannerUrl: string;
  likes: number;
  views: number;
  wordsCount: number;
  wordsLearned: number;
  isLiked: number;
  comments: {
    id: number;
    content: string;
    user: {
      name: string;
    };
  }[];
};

type CollectionProps = {
  texts: Texts & CommentSectionTexts;
  collectionId: string;
  errors: CommentSectionErrors;
};

const CollectionContent = ({ texts, errors, ...props }: CollectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // state ro check is modal open
  const [collection, setCollection] = useState<Collection | undefined>();
  const [error, setError] = useState(false);

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
      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/${props.collectionId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setCollection(res.data.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCollection = async () => {
    try {
      const res = await axios.post(
        `http://18.212.227.5:8876/api/v1/users/startCollection/${props.collectionId}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const likeCollection = async () => {
    try {
      await axios.patch(
        `http://18.212.227.5:8876/api/v1/users/like/${collection!.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setCollection((col) =>
      col
        ? {
            ...col,
            likes: Boolean(col.isLiked) ? col.likes - 1 : col.likes + 1,
            isLiked: Number(!Boolean(col.isLiked)),
          }
        : undefined
    );
  };

  return !collection ? (
    error ? (
      <h3 className="absolute text-h3 left-1/2 -translate-x-1/2 text-center w-full">
        {texts.error}
      </h3>
    ) : (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <CircularProgress color="primary" />
      </div>
    )
  ) : (
    <div className="w-screen min-h-screen overflow-hidden">
      <div
        className="w-screen h-[230px] sm:h-[374px] flex flex-col justify-center items-center gap-[10px] text-center border-b-2 border-blue-marguerite-700 dark:border-dark-grey"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${collection.bannerUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className=" w-full text-white text-h2 sm:text-h1 [text-shadow:0px_0px_4px_#000]">
          {collection.name}
        </h1>
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
            <p className="text-label">
              {collection.likes} {texts.likes}
            </p>
            <div onClick={likeCollection} className="cursor-pointer">
              {collection.isLiked ? (
                <ThumbUpAltIcon sx={{ width: "36px", height: "36px" }} />
              ) : (
                <ThumbUpAltOutlinedIcon
                  sx={{ width: "36px", height: "36px" }}
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-[4px]">
            <p className="text-label">
              {collection.views} {texts.views}
            </p>
            <VisibilityOutlinedIcon sx={{ width: "36px", height: "36px" }} />
          </div>
          <FavoriteButton />
        </div>
        <div className="text-center flex flex-wrap max-md:flex-col items-center justify-between gap-[20px]">
          <PieStatistic
            wordsLearned={collection.wordsLearned}
            wordsCount={collection.wordsCount}
          />
          {/* <ColumnStatistic /> */}
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
        collectionId={props.collectionId}
        fetchCollection={fetchCollection}
        userId={user.id ? user.id.toString() : ""}
        comments={collection.comments}
        texts={{
          addComment: texts.addComment,
          comments: texts.comments,
          submit: texts.submit,
        }}
        errors={{
          minLen: errors.minLen,
          required: errors.required,
        }}
        addComment={(comment) =>
          setCollection((collVal: Collection | undefined) => {
            return collVal
              ? { ...collVal, comments: [...collVal?.comments, comment] }
              : collVal;
          })
        }
      />
    </div>
  );
};

export default CollectionContent;
