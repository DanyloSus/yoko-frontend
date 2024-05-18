// external imports
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// internal imports
import UserContent from "@/components/users/Content";
import { overkill } from "@/modules/internationalization/navigation";

// create multilanguage dynamic metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" }); // get translation for metadata

  return {
    title: t("user.title"), // set title
  };
}

const UserPage = () => {
  const t = useTranslations("User"); // get page translation

  return (
    <UserContent
      texts={overkill(
        ["texts.collections", "texts.settings", "texts.admin", "texts.exit"],
        t
      )}
    />
  );
};

export default UserPage;
