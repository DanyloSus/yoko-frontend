// external imports
import React from "react";
import { getTranslations } from "next-intl/server";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";
import MainSection from "@/components/landing/main";
import CollectionsSection from "@/components/landing/collections";
import WaysSection from "@/components/landing/ways";
import ReviewsSection from "@/components/landing/reviews";
import FinalSection from "@/components/landing/final";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("landing.title"),
    descriptions: t("landing.description"),
  };
}

const Landing = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Landing"); // get page translation

  return (
    <>
      <TranslatedHeader locale={locale} />
      <main className="dark:bg-black dark:text-white">
        <MainSection />
        <CollectionsSection />
        <WaysSection
          texts={overkill(
            [
              "Ways.title",
              "Ways.text",
              "Ways.mobileText",
              "Ways.firstTitle",
              "Ways.firstText",
              "Ways.firstMobileText",
              "Ways.secondTitle",
              "Ways.secondText",
              "Ways.secondMobileText",
              "Ways.thirdTitle",
              "Ways.thirdText",
              "Ways.thirdMobileText",
              "Ways.thirdCardSave",
              "Ways.thirdCardTranslate",
              "Ways.thirdCardBack",
              "Ways.fourthTitle",
              "Ways.fourthText",
              "Ways.fourthSecondTitle",
              "Ways.fourthSecondText",
              "Ways.fourthSecondMobileText",
              "Ways.fourthButtonText",
            ],
            t
          )}
        />
        <ReviewsSection />
        <FinalSection />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
