// useState needs CSR
"use client";

// external imports
import { useEffect, useState } from "react";

// internal imports
import SectionWrapper from "../wrappers/SectionWrapper";
import WaysContent, {
  FirstWayTexts,
  FourthWayTexts,
  SecondWayTexts,
  ThirdWayTexts,
} from "./ways/Content";
import NavBar from "./ways/NavBar";

// component texts
type Texts = {
  texts: {
    title: string;
    text: string;
    mobileText: string;
  } & FirstWayTexts &
    SecondWayTexts &
    ThirdWayTexts &
    FourthWayTexts;
};

const WaysSection = ({ texts }: Texts) => {
  const [page, setPage] = useState(0); // page state

  // useEffect to add function reveal onScroll
  useEffect(() => {
    window.addEventListener("scroll", reveal);

    reveal();
  }, []);

  // function for reveal if element has class reveal
  // I used it here because it is only one section which
  // uses CSR
  const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("activeAnim");
      }
    }
  };

  return (
    <SectionWrapper
      title={texts.title}
      text={texts.text}
      mobileText={texts.mobileText}
      className="min-h-[851px] flex flex-col justify-between items-center"
    >
      <div className="relative min-h-[402px] flex items-center justify-center">
        <WaysContent
          page={page}
          First={{
            firstMobileText: texts.firstMobileText,
            firstTitle: texts.firstTitle,
            firstText: texts.firstText,
          }}
          Second={{
            secondMobileText: texts.secondMobileText,
            secondText: texts.secondText,
            secondTitle: texts.secondTitle,
          }}
          Third={{
            thirdCardBack: texts.thirdCardBack,
            thirdCardTranslate: texts.thirdCardTranslate,
            thirdMobileText: texts.thirdMobileText,
            thirdText: texts.thirdText,
            thirdTitle: texts.thirdTitle,
          }}
          Fourth={{
            fourthButtonText: texts.fourthButtonText,
            fourthSecondMobileText: texts.fourthSecondMobileText,
            fourthSecondText: texts.fourthSecondText,
            fourthSecondTitle: texts.fourthSecondTitle,
            fourthText: texts.fourthText,
            fourthTitle: texts.fourthTitle,
          }}
        />
      </div>
      <NavBar page={page} setNewPage={(newPage: number) => setPage(newPage)} />
    </SectionWrapper>
  );
};

export default WaysSection;
