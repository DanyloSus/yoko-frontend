// useState CSR
"use client";

// external imports
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// internal imports
import FavoriteButton from "@/components/collections/collection/FavoriteButton";
import LearnPropositions from "@/components/collections/collection/LearnPropositions";
import useScrollBlock from "@/modules/hooks/useScrollBlock";
import { Store } from "@/modules/redux/store";
import { Collection } from "@/modules/types/elements";
import { CollectionResponse } from "@/modules/types/responses";
import {
  CommentSectionErrors,
  CommentSectionTexts,
  PropositionTexts,
} from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import CommentSection from "../CommentSection";
import PieStatistic from "../statistic/Pie";

type ContentTexts = {
  start: string;
  likes: string;
  views: string;
  error: string;
};

type CollectionProps = {
  texts: ContentTexts & CommentSectionTexts & PropositionTexts;
  collectionId: string;
  errors: CommentSectionErrors;
};

const CollectionContent = ({ texts, errors, ...props }: CollectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // state ro check is modal open
  const [collection, setCollection] = useState<Collection>(); // state for collection
  const [error, setError] = useState(false); // is error state

  // function for block and allow scrolling
  const [blockScroll, allowScroll] = useScrollBlock();

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to block or allow scroll
  useEffect(() => {
    if (isModalOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // function to fetch collection
  async function fetchCollection() {
    try {
      const res: CollectionResponse = await axios.get(
        `/api/collection/${props.collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // state for collection
      setCollection(res.data.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  // use effect to fetch collection on start
  useEffect(() => {
    fetchCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to add the collection to the user's
  const addCollection = async () => {
    try {
      await axios.post(
        `/api/collection/${props.collectionId}/addCollection`,
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

  // function to like collection
  const likeCollection = async () => {
    try {
      await axios.patch(`/api/collection/${collection!.id}/like`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    // update info about collection
    setCollection((col) =>
      col
        ? ({
            ...col,
            likes: Boolean(col.isLiked) ? col.likes! - 1 : col.likes! + 1,
            isLiked: Number(!Boolean(col.isLiked)),
          } as Collection)
        : undefined
    );
  };

  // if collection isn't loaded then show error or loading
  // else show collection
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
            wordsLearned={collection.wordsLearned!}
            wordsCount={collection.wordsCount!}
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
              ? { ...collVal, comments: [...collVal?.comments!, comment] }
              : collVal;
          })
        }
      />
    </div>
  );
};

export default CollectionContent;
