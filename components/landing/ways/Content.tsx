import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Text from "./Text";
import Test from "./Test";
import CardExercise, { CardTexts } from "./Card";

type ContentProps = {
  page: number; //active page
};

export type WaysTexts = {
  First: {
    firstTitle: string;
    firstText: string;
    firstMobileText: string;
  };
  Second: {
    secondTitle: string;
    secondText: string;
    secondMobileText: string;
  };
  Third: {
    thirdTitle: string;
    thirdText: string;
    thirdMobileText: string;
    thirdCardTranslate: string;
    thirdCardBack: string;
  };
  Fourth: {
    fourthTitle: string;
    fourthText: string;
    fourthSecondTitle: string;
    fourthSecondText: string;
    fourthSecondMobileText: string;
    fourthButtonText: string;
  };
};

const WaysContent = ({
  First,
  Second,
  Third,
  Fourth,
  ...props
}: ContentProps & WaysTexts) => {
  const content = [
    {
      title: First.firstTitle,
      text: First.firstText,
      mobileText: First.firstMobileText,
      content: <Text />,
    },
    {
      title: Second.secondTitle,
      text: Second.secondText,
      mobileText: Second.secondMobileText,
      content: <Test />,
    },
    {
      title: Third.thirdTitle,
      text: Third.thirdText,
      mobileText: Third.thirdMobileText,
      content: (
        <CardExercise
          back={Third.thirdCardBack}
          translate={Third.thirdCardBack}
        />
      ),
    },
    {
      title: Fourth.fourthTitle,
      text: Fourth.fourthText,
      mobileText: Fourth.fourthText,
      secondTitle: Fourth.fourthSecondTitle,
      secondText: Fourth.fourthSecondText,
      secondMobileText: Fourth.fourthSecondMobileText,
      content: (
        <Link href="/ai/check">
          <StyledButton variant="contained">
            {Fourth.fourthButtonText}
          </StyledButton>
        </Link>
      ),
    },
  ];

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-5 justify-center items-center text-center relative"
          initial={{
            x: "-25%",
            opacity: 0,
            position: "absolute",
          }}
          animate={{
            x: 0,
            opacity: 1,
            position: "initial",
          }}
          exit={{
            x: "25%",
            opacity: 0,
            position: "absolute",
            y: "-1px",
          }}
          key={props.page}
        >
          <h3 className="text-h6 sm:text-h4">{content[props.page].title}</h3>
          <p className="max-sm:hidden max-w-[580px]">
            {content[props.page].text}
          </p>
          <p className="sm:hidden">{content[props.page].mobileText}</p>
          {content[props.page].secondTitle ? (
            <>
              <h3 className="text-h6 max-sm:hidden sm:text-h4">
                {content[props.page].secondTitle}
              </h3>
              <p className="max-sm:hidden max-w-[580px]">
                {content[props.page].secondText}
              </p>
              <p className="sm:hidden">
                {content[props.page].secondMobileText}
              </p>
            </>
          ) : null}

          {content[props.page].content}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WaysContent;
