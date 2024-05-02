import StyledButton from "@/ui/Button";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type CardProps = {
  englishWord: string;
  ukrainianWord: string;
  forward: () => void;
  back: () => void;
};

const Card = (props: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const style =
    "card  min-h-[474px] rounded-[16px] shadow-md flex flex-col border-2 border-dark-grey p-[24px]";

  return (
    <div className="mx-auto max-w-[580px] w-full">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className={style + " justify-between items-center"}>
          <div />
          <h2 className="text-h2 capitalize">{props.englishWord}</h2>
          <div className="flex flex-col items-center gap-[17px]">
            <StyledButton variant="contained" className="w-[76px]">
              Save
            </StyledButton>
            <StyledButton
              variant="text"
              className="w-[154px]"
              onClick={() => setIsFlipped((state) => !state)}
            >
              Show Translate
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
          <h2 className="text-h2 capitalize">{props.ukrainianWord}</h2>
          <StyledButton
            variant="text"
            sx={{ w: "77px" }}
            onClick={() => setIsFlipped((state) => !state)}
          >
            Back
          </StyledButton>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;