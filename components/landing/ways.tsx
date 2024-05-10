"use client";

import React, { useState } from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import NavBar from "./NavBar";
import WaysContent from "./ways/Content";

const WaysSection = () => {
  const [page, setPage] = useState(1);

  return (
    <SectionWrapper
      title="Modern Way of Learning"
      text="Experience a new era of language learning with our innovative methods designed to make learning engaging and effective."
      mobileText="Experience a new era of language learning with our innovative methods designed to make learning engaging and effective."
      className="min-h-[851px] flex flex-col justify-between items-center"
    >
      <WaysContent page={page} />
      <NavBar page={page} setNewPage={(newPage: number) => setPage(newPage)} />
    </SectionWrapper>
  );
};

export default WaysSection;
