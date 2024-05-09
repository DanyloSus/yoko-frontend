// hooks needs CSR
"use client";

// external imports
import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// internal imports
import Card from "./Card";
import axios from "axios";

type ComponentProps = {
  //   englishText: string[];
  //   ukrainianText: string[];
  collectionId: string;
};

type Texts = {
  texts: {
    save: string;
    translate: string;
    back: string;
  };
};

const CardComponents = ({ texts, ...props }: ComponentProps & Texts) => {
  const [step, setStep] = useState(0); // step of array
  const [cards, setCards] = useState<ReactNode[]>(); // state of texts' cards

  // useEffect hook to update the cards array when the props change
  useEffect(() => {
    async function fetchCards() {
      const res = await axios.get(
        `http://localhost:8876/api/v1/collections/${props.collectionId}/flashCards`
      );

      // map over the english text array to create motion.div elements for each card
      setCards(
        res.data.data.map(
          (
            words: {
              word: string;
              translationUk: string;
            },
            index: number
          ) => (
            <motion.div
              key={index}
              initial={{ x: "-25%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{
                x: "25%",
                opacity: 0,
                position: "absolute",
              }}
              transition={{ ease: "easeInOut" }}
              className="max-w-[580px] w-full"
            >
              <Card
                texts={texts}
                englishWord={words.word}
                ukrainianWord={words.translationUk}
                forward={nextStep}
                back={backStep}
              />
            </motion.div>
          )
        )
      );
    }

    fetchCards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  // function to handle moving to the next step
  function nextStep() {
    if (cards && step === cards.length - 1) {
      setStep(0);
      return;
    }
    setStep((step) => (step += 1));
    return;
  }

  // function to handle moving to the previous step
  function backStep() {
    setStep((prevStep) => {
      console.log("cards", cards, "prevStep", prevStep);

      if (prevStep === 0 && cards) {
        return cards.length + 1;
      } else {
        return prevStep - 1;
      }
    });
  }

  // AnimatePresence to enable exit animations
  return cards ? (
    <div className="absolute top-0 w-screen left-0 h-screen flex items-center justify-center -z-10 px-phone md:px-tablet lg:px-pc">
      <AnimatePresence>{cards[step]}</AnimatePresence>
    </div>
  ) : null;
};

export default CardComponents;
