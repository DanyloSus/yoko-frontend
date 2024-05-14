// hooks needs CSR
"use client";

// external imports
import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// internal imports
import Card from "./Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import StyledLinearProgress from "@/ui/LinearProgress";
import ConfettiExplosion from "react-confetti-explosion";

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
  const [isLoading, setIsLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const [isExploding, setIsExploding] = React.useState(false);
  const user = useSelector((state: Store) => state.user);

  // useEffect hook to update the cards array when the props change
  useEffect(() => {
    setIsLoading(true);
    async function fetchCards() {
      const res = await axios.get(
        `http://18.212.227.5:8876/api/v1/collections/${props.collectionId}/flashCards`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      console.log(res.data.data.length);

      const newCards = res.data.data.map(
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
              forward={() => nextStep(res.data.data.length, index)}
              back={() => backStep(res.data.data.length, index)}
            />
          </motion.div>
        )
      );

      setCards(newCards);
    }

    fetchCards();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  // function to handle moving to the next step
  function nextStep(length: number, index: number) {
    if (index === length - 1) {
      setStep(0);
      setIsExploding(true);
      setCompleted(true);
    } else {
      setStep((prevStep) => prevStep + 1);
      setIsExploding(false);
    }
  }

  function backStep(length: number, index: number) {
    if (index === 0 && completed) setStep(length - 1);
    else if (index !== 0) setStep((prevStep) => prevStep - 1);
  }

  // AnimatePresence to enable exit animations
  return cards && !isLoading ? (
    <>
      <StyledLinearProgress
        value={
          completed ? 100 : Number(((100 * step) / cards.length).toFixed(2))
        }
      />
      <div className="absolute top-0 w-screen z-10 left-0 h-screen flex items-center justify-center px-phone md:px-tablet lg:px-pc">
        <AnimatePresence>{cards[step]}</AnimatePresence>
      </div>
      {isExploding && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ConfettiExplosion />
        </div>
      )}
    </>
  ) : null;
};

export default CardComponents;
