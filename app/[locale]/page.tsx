// external imports
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import Footer from "@/components/Footer";
import TranslatedHeader from "@/components/header/TranslatedHeader";
import CollectionsSection from "@/components/landing/Collections";
import FinalSection from "@/components/landing/Final";
import MainSection from "@/components/landing/Main";
import ReviewsSection from "@/components/landing/Reviews";
import WaysSection from "@/components/landing/Ways";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" }); // get translation for metadata

  return {
    title: t("landing.title"), // set title
    descriptions: t("landing.description"), // set description
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
