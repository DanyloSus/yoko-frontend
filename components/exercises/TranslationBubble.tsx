// external imports
import React from "react";

// internal imports
import StyledButton from "@/ui/Button";
import TranslateTooltip from "@/ui/Tooltip";

type BubbleProps = {
  text: string;
  translationUk: string;
};

type Texts = {
  bubbleText: string;
};

const TranslationBubble = ({ bubbleText, ...props }: BubbleProps & Texts) => {
  return (
    <TranslateTooltip
      arrow
      placement="top"
      enterTouchDelay={0}
      title={
        <div className="flex flex-col items-center p-[4px] font-dmSans">
          <div className="flex items-center gap-[10px]">
            <p className="text-p">{props.translationUk}</p>
          </div>
        </div>
      }
    >
      <span className="underline decoration-dotted decoration-grey">
        {props.text}
      </span>
    </TranslateTooltip>
  );
};

export default TranslationBubble;
