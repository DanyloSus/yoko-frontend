// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";
import MovingText from "@/components/MovingText";
import StyledButton from "@/ui/Button";
import { Link } from "@/modules/internationalization/navigation";
import MainSection from "@/components/landing/main";
import CollectionsSection from "@/components/landing/collections";
import WaysSection from "@/components/landing/ways";
import ReviewsSection from "@/components/landing/reviews";
import FinalSection from "@/components/landing/final";
import Footer from "@/components/Footer";

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
        <WaysSection />
        <ReviewsSection />
        <FinalSection />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
