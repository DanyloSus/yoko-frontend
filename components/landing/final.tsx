import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";

const FinalSection = () => {
  return (
    <SectionWrapper
      title="Join Our Community"
      text="Become a part of our vibrant community of language learners! Share your knowledge, learn from others, and stay motivated on your language learning journey."
      mobileText="Become a part of our vibrant community of language learners! Share your knowledge, learn from others, and stay motivated on your language learning journey."
      fullScreen
      className="flex flex-col items-center justify-center gap-5 text-center"
    >
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">Collaborate and Grow</h4>
        <p className="max-sm:hidden">
          Collaborate with fellow learners to create unique collections,
          exchange ideas, and support each other&apos;s learning goals.
        </p>
      </div>
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">Stay Inspired</h4>
        <p className="max-sm:hidden">
          Get inspired by success stories, language learning tips, and
          motivational content shared by our community members.
        </p>
      </div>
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">
          Start Your Language Journey Today
        </h4>
        <p className="max-sm:hidden">
          Join us today and embark on a rewarding journey towards language
          fluency and cultural enrichment. Together, we can achieve our language
          learning goals!.
        </p>
        <p className="sm:hidden">
          Join us today and embark on a rewarding journey towards language
          fluency and cultural enrichment.
        </p>
      </div>
      <div className="flex gap-[16px]">
        <Link href="/authentification/login" className="reveal">
          <StyledButton
            variant="contained"
            sx={{
              width: "80px",
            }}
          >
            Login
          </StyledButton>
        </Link>
        <Link href="/authentification/register" className="reveal">
          <StyledButton variant="contained">Register</StyledButton>
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default FinalSection;
