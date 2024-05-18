// external imports
import { useTranslations } from "next-intl";

// internal imports
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/mui/Button";
import MovingText from "../MovingText";

const MainSection = () => {
  const t = useTranslations("Landing"); // get page translation

  return (
    <>
      <div className="bg-blue-marguerite-500 dark:bg-black w-screen h-screen flex flex-col text-blue-marguerite-50 items-center justify-center text-center px-phone md:px-tablet lg:px-pc">
        <div className="relative z-10">
          <h1 className="text-h4 sm:text-h2 md:text-[64px] md:leading-[64px]">
            {t("Main.heading")}
          </h1>
          <p className="font-dmSans my-[4px] md:mt-[25px] w-full">
            {t("Main.description")}
          </p>
          <div className="flex items-center justify-center gap-[20px] sm:hidden">
            <Link href="/authentification/register">
              <StyledButton variant="contained">
                {t("Main.register")}
              </StyledButton>
            </Link>
            <Link href="/authentification/login">
              <StyledButton variant="contained" sx={{ width: "80px" }}>
                {t("Main.login")}
              </StyledButton>
            </Link>
          </div>
        </div>
      </div>
      <MovingText />
    </>
  );
};

export default MainSection;
