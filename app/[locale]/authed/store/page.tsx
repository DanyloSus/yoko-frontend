// external imports
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import StoreContent from "@/components/collections/Store";
import TranslatedSearch from "@/components/collections/TranslatedSearch";
import { Link } from "@/modules/internationalization/navigation";
import StyledButton from "@/ui/mui/Button";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" }); // get translation for metadata

  return {
    title: t("store.title"), // set title
    descriptions: t("store.description"), // set description
  };
}

const StorePage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const t = useTranslations("Store"); // get page translation

  return (
    <div className="w-full flex flex-col gap-[24px] relative">
      <div className="absolute top-[-20px] right-0">
        <Link href="store/add">
          <StyledButton variant="contained">{t("texts.add")}</StyledButton>
        </Link>
      </div>
      <h1 className="text-h2 sm:text-h1 text-center">{t("heading")}</h1>
      <div className="flex justify-between items-center gap-10">
        <TranslatedSearch />
      </div>
      <StoreContent
        query={searchParams?.query || ""}
        texts={{
          null: t("texts.null"),
          error: t("texts.error"),
          loading: t("texts.loading"),
        }}
      />
    </div>
  );
};

export default StorePage;
