// external imports
import { promises as fs } from "fs";
import { useTranslations } from "next-intl";
import path from "path";

// internal imports
import Comment from "../collections/Comment";
import SectionWrapper from "../wrappers/SectionWrapper";

const ReviewsSection = async () => {
  const t = useTranslations("Landing"); // get page translation

  const imageDirectory = path.join(process.cwd(), "/public/images"); // get image directory
  const imageFilenames = await fs.readdir(imageDirectory); // get images names

  return (
    <SectionWrapper
      title={t("Reviews.title")}
      fullScreen
      className="flex flex-col justify-between"
    >
      <div className="flex gap-[20px]">
        <div className="grid row-span-3 gap-[20px]">
          <Comment
            name={t("Reviews.First.name")}
            content={t("Reviews.First.content")}
            className="reveal"
            image={`/images/${imageFilenames[0]}`}
          />
          <Comment
            name={t("Reviews.Second.name")}
            content={t("Reviews.Second.content")}
            className="reveal"
            image={`/images/${imageFilenames[1]}`}
          />
          <Comment
            name={t("Reviews.Third.name")}
            content={t("Reviews.Third.content")}
            className="reveal"
            image={`/images/${imageFilenames[2]}`}
          />
        </div>
        <div className="grid row-span-3 gap-[20px] max-sm:hidden">
          <Comment
            name={t("Reviews.Fourth.name")}
            content={t("Reviews.Fourth.content")}
            className="reveal"
            image={`/images/${imageFilenames[3]}`}
          />
          <Comment
            name={t("Reviews.Fifth.name")}
            content={t("Reviews.Fifth.content")}
            className="reveal"
            image={`/images/${imageFilenames[4]}`}
          />
          <Comment
            name={t("Reviews.Sixth.name")}
            content={t("Reviews.Sixth.content")}
            className="reveal"
            image={`/images/${imageFilenames[5]}`}
          />
        </div>
      </div>
      <div />
      <div />
    </SectionWrapper>
  );
};

export default ReviewsSection;
