"use client";

import React, { useState } from "react";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { AnimatePresence, motion } from "framer-motion";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {isFavorite ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute" }}
            key={"true"}
          >
            <GradeIcon
              sx={{
                width: "36px",
                height: "36px",
                fill: "#FFA041",
              }}
              className="cursor-pointer"
              onClick={() => setIsFavorite((state) => !state)}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute" }}
            key={"false"}
          >
            <GradeOutlinedIcon
              sx={{
                width: "36px",
                height: "36px",
                fill: "black",
              }}
              className="cursor-pointer"
              onClick={() => setIsFavorite((state) => !state)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteButton;
