"use client";

import React, { useEffect, useState } from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import NavBar from "./NavBar";
import WaysContent, { WaysTexts } from "./ways/Content";

type Texts = {
  texts: {
    title: string;
    text: string;
    mobileText: string;
    firstTitle: string;
    firstText: string;
    firstMobileText: string;
    secondTitle: string;
    secondText: string;
    secondMobileText: string;
    thirdTitle: string;
    thirdText: string;
    thirdMobileText: string;
    thirdCardSave: string;
    thirdCardTranslate: string;
    thirdCardBack: string;
    fourthTitle: string;
    fourthText: string;
    fourthSecondTitle: string;
    fourthSecondText: string;
    fourthSecondMobileText: string;
    fourthButtonText: string;
  };
};

const WaysSection = ({ texts }: Texts) => {
  const [page, setPage] = useState(0);

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

  useEffect(() => {
    window.addEventListener("scroll", reveal);

    reveal();
  }, []);

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
