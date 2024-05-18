// internal imports
import TranslateTooltip from "@/ui/mui/Tooltip";

type BubbleProps = {
  text: string;
  translationUk: string;
};

type BubbleTexts = {
  bubbleText: string;
};

const TranslationBubble = ({
  bubbleText,
  ...props
}: BubbleProps & BubbleTexts) => {
  return (
    <TranslateTooltip
      arrow
      placement="top"
      enterTouchDelay={0}
      title={
        <div className="flex flex-col items-center p-[4px] font-dmSans text-center">
          <div className="flex items-center gap-[10px]">
            <p className="text-p">
              {props.translationUk.replaceAll("&#39;", "'")}
            </p>
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
