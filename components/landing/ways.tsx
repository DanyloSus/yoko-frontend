"use client";

import React, { useEffect, useState } from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import NavBar from "./NavBar";
import WaysContent from "./ways/Content";
import { AnimatePresence } from "framer-motion";

const WaysSection = () => {
  const [page, setPage] = useState(0);

  const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
    const revealsT = document.querySelectorAll(".revealT");
    for (let i = 0; i < revealsT.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsT[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsT[i].classList.add("active");
      }
    }
    const revealsI = document.querySelectorAll(".revealI");
    for (let i = 0; i < revealsI.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealsI[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealsI[i].classList.add("active");
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
