// use state needs CSR
"use client";

// external imports
import GradeIcon from "@mui/icons-material/Grade";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false); // state for button

  // get user's theme
  const theme = useSelector((state: Store) => state.theme);

  return (
    <div className="relative">
      {/* Animate presence is for applying exit animation on dom changes */}
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
                fill: theme === "dark" ? "#FFF" : "black",
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
