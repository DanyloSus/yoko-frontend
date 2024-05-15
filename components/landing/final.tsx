import React from "react";
import SectionWrapper from "../wrappers/SectionWrapper";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/Button";
import { useTranslations } from "next-intl";

const FinalSection = () => {
  const t = useTranslations("Landing");

  return (
    <SectionWrapper
      title={t("Final.title")}
      text={t("Final.text")}
      mobileText={t("Final.text")}
      fullScreen
      className="flex flex-col items-center justify-center gap-5 text-center"
    >
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">{t("Final.First.h4")}</h4>
        <p className="max-sm:hidden">{t("Final.First.p")}</p>
      </div>
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">{t("Final.Second.h4")}</h4>
        <p className="max-sm:hidden">{t("Final.Second.p")}</p>
      </div>
      <div className="reveal">
        <h4 className="text-h6 sm:text-h4">{t("Final.Third.h4")}</h4>
        <p className="max-sm:hidden">{t("Final.Third.p")}</p>
        <p className="sm:hidden">{t("Final.Third.mobileP")}</p>
      </div>
      <div className="flex gap-[16px]">
        <Link href="/authentification/login" className="reveal">
          <StyledButton
            variant="contained"
            sx={{
              width: "80px",
            }}
          >
            {t("Final.Buttons.login")}
          </StyledButton>
        </Link>
        <Link href="/authentification/register" className="reveal">
          <StyledButton variant="contained">
            {t("Final.Buttons.register")}
          </StyledButton>
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default FinalSection;
