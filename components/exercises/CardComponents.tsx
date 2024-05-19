// hooks needs CSR
"use client";

// external imports
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";
import { CardExerciseResponse } from "@/modules/types/responses";
import { CardTexts } from "@/modules/types/texts";
import StyledLinearProgress from "@/ui/mui/LinearProgress";
import Card from "./Card";

type ComponentProps = {
  //   englishText: string[];
  //   ukrainianText: string[];
  collectionId: string;
  texts: CardTexts;
};

const CardComponents = ({ texts, ...props }: ComponentProps) => {
  const [step, setStep] = useState(0); // step of array
  const [cards, setCards] = useState<ReactNode[]>(); // state of texts' cards
  const [isLoading, setIsLoading] = useState(true); // state for loading
  const [completed, setCompleted] = useState(false); // state for checking is user finished exercise
  // state for checking confetti explosion
  const [isExploding, setIsExploding] = useState(false);

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to load cards on start
  useEffect(() => {
    setIsLoading(true);
    async function fetchCards() {
      try {
        const res: CardExerciseResponse = await axios.get(
          `/api/collection/${props.collectionId}/exercises/cards`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // get words
        const words = res.data.data;

        // variable for cards
        const newCards = words.map(
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

        // set cards
        setCards(newCards);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCards();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // function to handle moving to the preview step
  function backStep(length: number, index: number) {
    if (index === 0 && completed) setStep(length - 1);
    else if (index !== 0) setStep((prevStep) => prevStep - 1);
  }

  return cards && !isLoading ? (
    <>
      <StyledLinearProgress
        value={
          completed ? 100 : Number(((100 * step) / cards.length).toFixed(2))
        }
      />
      <div className="absolute top-0 w-screen z-10 left-0 h-screen flex items-center justify-center px-phone md:px-tablet lg:px-pc">
        {/*  AnimatePresence to enable exit animations */}
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
