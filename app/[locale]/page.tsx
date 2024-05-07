// external imports
import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import TranslatedHeader from "@/components/header/TranslatedHeader";
import MovingText from "@/components/MovingText";
import StyledButton from "@/ui/Button";
import { Link } from "@/modules/internationalization/navigation";

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

const Landing = () => {
  const t = useTranslations("Landing"); // get page translation

  return (
    <>
      <TranslatedHeader />
      <main className="bg-blue-marguerite-500 w-screen h-screen flex flex-col text-blue-marguerite-50 items-center justify-center text-center px-phone md:px-tablet lg:px-pc">
        <div className="relative z-10">
          <h1 className="text-h4 sm:text-h2 md:text-[64px] md:leading-[64px]">
            {t("heading")}
          </h1>
          <p className="font-dmSans my-[4px] md:mt-[25px] w-full">
            {t("description")}
          </p>
          <div className="flex items-center justify-center gap-[20px] sm:hidden">
            <Link href="/register">
              <StyledButton variant="contained">{t("register")}</StyledButton>
            </Link>
            <Link href="/login">
              <StyledButton variant="contained" sx={{ width: "80px" }}>
                {t("login")}
              </StyledButton>
            </Link>
          </div>
        </div>
      </main>
      <MovingText />
    </>
  );
};

export default Landing;
