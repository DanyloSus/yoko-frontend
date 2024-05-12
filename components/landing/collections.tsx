import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import CollectionTitle from "../collections/CollectionTitle";

const sectionText = [
  {
    h4: "Explore & Learn",
    p: "Discover a multitude of collections, each tailored to a specific theme or language level. From beginner basics to advanced nuances, there's something for everyone.",
    mobile:
      "Discover a multitude of collections, each tailored to a specific theme or language level.",
  },
  {
    h4: "Create & Share",
    p: "Unleash your creativity by creating your collections. Share them with the world, or keep them private for your personal learning journey.",
    mobile: "Unleash your creativity by creating your collections.",
  },
  {
    h4: "Customize & Organize",
    p: "Tailor your learning experience by filtering collections based on name, popularity, or personal preferences. Stay organized and track your progress effortlessly.",
    mobile: "Stay organized and track your progress effortlessly.",
  },
  {
    h4: "Join the Community",
    p: "Connect with like-minded learners, exchange ideas, and grow together. Like and save your favorite collections to revisit them anytime.",
    mobile:
      "Connect with like-minded learners, exchange ideas, and grow together.",
  },
];

const sectionCollections = [
  {
    title: "1000 English Words",
    gradient: ["#8A83ED", "#4D47A5"],
  },
  {
    title: "Friends TV Show",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX680_.jpg",
  },
  {
    title: "One Piece",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UY10401_.jpg",
  },
  {
    title: "Terms For Cooking",
    gradient: ["#DA5F73", "#8E0B21"],
  },
];

const CollectionsSection = () => {
  return (
    <SectionWrapper
      title="Collections"
      fullScreen
      text="Welcome to our Collections section, where language learning meets creativity! Dive into a world of curated texts, carefully crafted to enhance your vocabulary. Browse through collections created by the community, or forge your path by crafting your own."
      mobileText="Welcome to our Collections section, where language learning meets creativity! Dive into a world of curated texts, carefully crafted to enhance your vocabulary."
    >
      <div className="max-sm:flex-col gap-10 flex item-center justify-between mt-10 max-sm:text-center">
        <div className="flex flex-col max-w-[580px] justify-center gap-5">
          {sectionText.map((text, index) => (
            <div key={index} className="reveal">
              <h4 className="text-h6 sm:text-h4">{text.h4}</h4>
              <p className="max-sm:hidden">{text.p}</p>
              <p className="sm:hidden">{text.mobile}</p>
            </div>
          ))}
        </div>
        <div className="relative max-w-[480px]  justify-center w-full flex flex-col items-end mx-auto">
          {sectionCollections.map((collection, index) => (
            <div
              className=" max-w-[280px] w-full relative max-sm:hidden reveal"
              style={{
                bottom: 42 * index + "px",
                marginRight: index % 2 === 1 ? "auto" : "",
              }}
              key={index}
            >
              <CollectionTitle
                id={index}
                title={collection.title}
                isNotLink
                gradient={collection.gradient ? collection.gradient : undefined}
                image={collection.image ? collection.image : undefined}
              />
            </div>
          ))}
          <div className="sm:hidden w-full reveal">
            <div
              className=" max-w-[280px] w-full relative"
              key={0}
              style={{
                marginLeft: "auto",
              }}
            >
              <CollectionTitle
                id={0}
                title={sectionCollections[0].title}
                isNotLink
                gradient={
                  sectionCollections[0].gradient
                    ? sectionCollections[0].gradient
                    : undefined
                }
                image={
                  sectionCollections[0].image
                    ? sectionCollections[0].image
                    : undefined
                }
              />
            </div>
            <div
              className=" max-w-[280px] w-full relative"
              style={{
                bottom: "42px",
              }}
              key={1}
            >
              <CollectionTitle
                id={1}
                title={sectionCollections[1].title}
                isNotLink
                gradient={
                  sectionCollections[1].gradient
                    ? sectionCollections[1].gradient
                    : undefined
                }
                image={
                  sectionCollections[1].image
                    ? sectionCollections[1].image
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CollectionsSection;
