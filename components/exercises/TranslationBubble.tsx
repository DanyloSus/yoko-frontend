// external imports
import React from "react";

// internal imports
import StyledButton from "@/ui/Button";
import TranslateTooltip from "@/ui/Tooltip";

type BubbleProps = {
  englishText: string[];
  ukrainianText: string[];
};

type Texts = {
  bubbleText: string;
};

const TranslationBubble = ({ bubbleText, ...props }: BubbleProps & Texts) => {
  return (
    <div>
      {props.englishText.map((word, index) => (
        // here we sift english words to make
        // sentence but on hover every word show tooltip
        // with tranlation
        <TranslateTooltip
          arrow
          placement="top"
          key={index}
          title={
            <div className="flex flex-col items-center p-[4px] font-dmSans">
              <StyledButton
                variant="contained"
                className="w-[100px] h-[16px] text-label whitespace-nowrap font-dmSans"
              >
                {bubbleText}
              </StyledButton>
              <div className="flex items-center gap-[10px]">
                {index !== 0 ? (
                  <p className="opacity-50">{props.ukrainianText[index - 1]}</p>
                ) : (
                  <div />
                )}
                <p className="text-p">{props.ukrainianText[index]}</p>
                {index !== props.englishText.length - 1 ? (
                  <p className="opacity-50">{props.ukrainianText[index + 1]}</p>
                ) : (
                  <div />
                )}
              </div>
            </div>
          }
        >
          <span className="underline decoration-dotted decoration-grey">
            {word}{" "}
          </span>
        </TranslateTooltip>
      ))}
    </div>
  );
};

export default TranslationBubble;
