"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
import Card from "./Card";

type ComponentProps = {
  englishText: string[];
  ukrainianText: string[];
};

const CardComponents = (props: ComponentProps) => {
  const [step, setStep] = useState(0);
  const [cards, setCards] = useState<ReactNode[]>([]);
  const [direction, setDirection] = useState<"r" | "l">("r");

  useEffect(() => {
    setCards(
      props.englishText.map((word, index) => (
        <motion.div
          key={index}
          initial={{ x: direction === "r" ? "-25%" : "25%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{
            x: direction === "r" ? "-25%" : "25%",
            opacity: 0,
            position: "absolute",
          }}
          transition={{ ease: "easeInOut" }}
        >
          <Card
            englishWord={word}
            ukrainianWord={props.ukrainianText[index]}
            forward={nextStep}
            back={backStep}
          />
        </motion.div>
      ))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.englishText, direction, props.ukrainianText, step]);

  function nextStep() {
    setDirection("r");
    if (step === props.englishText.length - 1) {
      setStep(0);
      return;
    }
    setStep((step) => (step += 1));
    return;
  }

  function backStep() {
    setDirection("l");
    if (step === 0) {
      setStep(props.englishText.length - 1);
      return;
    }
    setStep((step) => (step -= 1));
    return;
  }

  return <AnimatePresence>{cards[step]}</AnimatePresence>;
};

export default CardComponents;
