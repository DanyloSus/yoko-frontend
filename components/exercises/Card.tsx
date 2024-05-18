// useState needs CSR
"use effect";

// external imports
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

// internal imports
import { CardTexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";

type CardProps = {
  englishWord: string;
  ukrainianWord: string;
  forward: () => void;
  back: () => void;
  isSmall?: boolean;
  texts: CardTexts;
};

const Card = ({ texts, ...props }: CardProps) => {
  // basic card style
  const style = `card ${
    props.isSmall ? "min-h-[294px]" : "min-h-[474px]"
  }  rounded-[16px] shadow-md flex flex-col border-2 border-dark-grey p-[24px]`;

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
              variant="contained"
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
            variant="contained"
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
