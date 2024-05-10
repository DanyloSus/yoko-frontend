import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import Comment from "../collections/Comment";

const ReviewsSection = () => {
  return (
    <SectionWrapper
      title="We are trusted world wide!"
      fullScreen
      className="flex flex-col justify-between"
    >
      <div className="flex gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <Comment
            name="Monkey D. Luffy"
            content="I really like this app, it really helps to have fun and get smarter in my free time, although I install it to order food, though !"
          />
          <Comment name="Franky" content="This app is just SUUUUUPER !" />
          <Comment
            name="Roronoa Zoro"
            content="Something do happen, something that makes me smarter and in the same time gives me joy !"
          />
        </div>
        <div className="flex flex-col gap-[20px] max-sm:hidden">
          <Comment
            name="Nami"
            content="Now I switched from other couple of apps  and really cut my expenses over the time, but listen carefully ! this is my coupon..."
          />
          <Comment
            name="Tony Tony Chopper"
            content="Now days it is hard to learn specific professional  vocabulary for, but this app is a real lifesaver "
          />
          <Comment
            name="Usopp"
            content="I am not gonna lie that app is awesome !"
          />
        </div>
      </div>
      <div />
      <div />
    </SectionWrapper>
  );
};

export default ReviewsSection;
