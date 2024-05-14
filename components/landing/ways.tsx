"use client";

import React, { useEffect, useState } from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import NavBar from "./NavBar";
import WaysContent from "./ways/Content";

const WaysSection = () => {
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
      title="Modern Way of Learning"
      text="Experience a new era of language learning with our innovative methods designed to make learning engaging and effective."
      mobileText="Experience a new era of language learning with our innovative methods designed to make learning engaging and effective."
      className="min-h-[851px] flex flex-col justify-between items-center"
    >
      <div className="relative min-h-[402px] flex items-center justify-center">
        <WaysContent page={page} />
      </div>
      <NavBar page={page} setNewPage={(newPage: number) => setPage(newPage)} />
    </SectionWrapper>
  );
};

export default WaysSection;
