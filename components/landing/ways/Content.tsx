import Card from "@/components/exercises/Card";
import TranslationBubble from "@/components/exercises/TranslationBubble";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import React, { ReactNode, useState } from "react";

type ContentProps = {
  page: number; //active page
};

const WaysContent = (props: ContentProps) => {
  const [buttons, setButtons] = useState<ReactNode[]>([
    <StyledButton
      variant="outlined"
      key={0}
      onClick={() => checkAnswer("Вітаю", 0)}
    >
      Вітаю
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={1}
      onClick={() => checkAnswer("Кіт", 1)}
    >
      Кіт
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={2}
      onClick={() => checkAnswer("Телефон", 2)}
    >
      Телефон
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={3}
      onClick={() => checkAnswer("Яблуко", 3)}
    >
      Яблуко
    </StyledButton>,
  ]); // state of answers' buttons

  function checkAnswer(answer: string, buttonIndex: number) {
    if (answer === "Вітаю") {
    }

    // disable the selected button if the answer is incorrect
    setButtons((buttons) =>
      buttons.map((button, index) => {
        if (index === buttonIndex) {
          const buttonProps = (button as React.ReactElement).props;
          return React.cloneElement(button as React.ReactElement, {
            ...buttonProps,
            disabled: true,
          });
        }
        return button;
      })
    );
  }

  const content = [
    {
      title: "Interactive Texts",
      text: "Immerse yourself in the language by reading texts in English and Ukrainian. Simply hover over a word for its translation, making learning seamless and efficient.",
      mobileText:
        "Immerse yourself in the language by reading texts in English and Ukrainian.",
      content: (
        <p>
          {...["Some", "sentence", "with", "some", "text."].map(
            (word, index) => (
              <TranslationBubble
                key={index}
                text={`${word} `}
                translationUk={
                  ["Якесь", "речення", "із", "якимось", "текстом."][index]
                }
                bubbleText=""
              />
            )
          )}
        </p>
      ),
    },
    {
      title: "Engaging Tests",
      text: "Test your knowledge with our interactive quizzes. Choose the correct translation for words in English, reinforcing your understanding and retention.",
      mobileText: "Test your knowledge with our interactive quizzes.",
      content: (
        <div className="text-center relative">
          <h1 className="text-h2 mb-[31px] capitalize">Hello</h1>
          <div className="flex flex-col sm:grid grid-cols-2 gap-[16px] sm:gap-[40px]">
            {buttons}
          </div>
        </div>
      ),
    },
    {
      title: "Flashcards Reinvented",
      text: "Revise vocabulary effortlessly with our interactive flashcards. See the word in English, then flip the card to reveal its translation, reinforcing your memory.",
      mobileText:
        "Revise vocabulary effortlessly with our interactive flashcards.",
      content: (
        <div className="max-w-[360px] w-full h-full min-h-[294px]">
          <Card
            back={() => {}}
            englishWord="Hello"
            forward={() => {}}
            ukrainianWord="Вітаю"
            isSmall
            texts={{
              back: "",
              save: "",
              translate: "",
            }}
          />
        </div>
      ),
    },
    {
      title: "AI-Powered Tools",
      text: "Benefit from AI assistance to assess your English level. Engage in conversations with our AI chatbot to practice and receive feedback on your writing skills.",
      mobileText:
        "Benefit from AI assistance to assess your English level. Engage in conversations with our AI chatbot to practice and receive feedback on your writing skills.",
      secondTitle: "Conversational Practice",
      secondText:
        "Practice speaking with our AI, which uses words from the collections you're studying. Get real-time feedback and improve your fluency and confidence. Enhance your learning experience with our modern tools and techniques. Start your journey to language mastery today!",
      secondMobileText:
        "Practice speaking with our AI, which uses words from the collections you're studying. Get real-time feedback and improve your fluency and confidence",
      content: (
        <Link href="/ai/check">
          <StyledButton variant="contained">
            Test your english level by AI
          </StyledButton>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center">
      <h3 className="text-h6 sm:text-h4">{content[props.page].title}</h3>
      <p className="max-sm:hidden max-w-[580px]">{content[props.page].text}</p>
      <p className="sm:hidden">{content[props.page].mobileText}</p>
      {content[props.page].content}
    </div>
  );
};

export default WaysContent;
