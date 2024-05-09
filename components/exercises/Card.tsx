// useState needs CSR
"use effect";

// external imports
import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ReactCardFlip from "react-card-flip";

// internal imports
import StyledButton from "@/ui/Button";

type CardProps = {
  englishWord: string;
  ukrainianWord: string;
  forward: () => void;
  back: () => void;
};

type Texts = {
  texts: {
    save: string;
    translate: string;
    back: string;
  };
};

// basic card style
const style =
  "card  min-h-[474px] rounded-[16px] shadow-md flex flex-col border-2 border-dark-grey p-[24px]";

const Card = ({ texts, ...props }: CardProps & Texts) => {
  const [isFlipped, setIsFlipped] = useState(false); // state to check is card flipped

  return (
    <div className="w-full">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className={style + " justify-between items-center"}>
          <div />
          <div className="flex flex-col items-center gap-[17px]">
            <h2 className="text-h3 capitalize break-all text-center">
              {props.englishWord}
            </h2>
            <StyledButton
              variant="text"
              onClick={() => setIsFlipped((state) => !state)}
            >
              {texts.translate}
            </StyledButton>
          </div>
          <div className="flex justify-between w-full">
            <ArrowBackOutlinedIcon
              className="w-[48px] h-[48px] cursor-pointer"
              onClick={props.back}
            />
            <ArrowBackOutlinedIcon
              sx={{ rotate: "180deg" }}
              className="w-[48px] h-[48px] cursor-pointer"
              onClick={props.forward}
            />
          </div>
        </div>
        <div className={style + " card-back items-center justify-center"}>
          <h2 className="text-h3 capitalize break-all text-center">
            {props.ukrainianWord}
          </h2>
          <StyledButton
            variant="text"
            sx={{ w: "77px" }}
            onClick={() => setIsFlipped((state) => !state)}
          >
            {texts.back}
          </StyledButton>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
