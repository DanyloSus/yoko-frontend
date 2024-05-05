// hooks needs CSR
"use client";

// external imports
import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// internal imports
import Card from "./Card";

type ComponentProps = {
  englishText: string[];
  ukrainianText: string[];
};

type Texts = {
  texts: {
    save: string;
    translate: string;
  };
};

const CardComponents = ({ texts, ...props }: ComponentProps & Texts) => {
  const [step, setStep] = useState(0); // step of array
  const [cards, setCards] = useState<ReactNode[]>([]); // state of texts' cards
  const [direction, setDirection] = useState<"r" | "l">("r"); // state for directions of cards

  // useEffect hook to update the cards array when the props change
  useEffect(() => {
    // map over the english text array to create motion.div elements for each card
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
            texts={texts}
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

  // function to handle moving to the next step
  function nextStep() {
    setDirection("r");
    if (step === props.englishText.length - 1) {
      setStep(0);
      return;
    }
    setStep((step) => (step += 1));
    return;
  }

  // function to handle moving to the previous step
  function backStep() {
    setDirection("l");
    if (step === 0) {
      setStep(props.englishText.length - 1);
      return;
    }
    setStep((step) => (step -= 1));
    return;
  }

  // AnimatePresence to enable exit animations
  return <AnimatePresence>{cards[step]}</AnimatePresence>;
};

export default CardComponents;
