import Sort from "@/components/sort/Sort";
import React from "react";
import StyledButton from "@/ui/Button";
import Collections from "@/components/collections/Collections";
import { overkill } from "../../login/page";
import { Link } from "@/modules/internationalization/navigation";
import { useTranslations } from "next-intl";

const StorePage = () => {
  const t = useTranslations("Store");

  return (
    <div className="w-full flex flex-col gap-[24px] relative">
      <div className="absolute top-0 right-0">
        <Link href="store/add">
          <StyledButton variant="contained">{t("texts.add")}</StyledButton>
        </Link>
      </div>
      <h1 className="text-h1 text-center">{t("heading")}</h1>
      <Sort
        texts={overkill(
          ["texts.sort", "texts.views", "texts.likes", "texts.difficult"],
          t
        )}
      />
      <Collections texts={{ null: t("texts.null") }} />
    </div>
  );
};

export default StorePage;
