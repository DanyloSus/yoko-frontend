// external imports
import { Metadata } from "next";
import { useTranslations } from "next-intl";

// internal imports
import CollectionForm from "@/components/forms/admins/CollectionForm";
import { overkill } from "@/modules/internationalization/navigation";

// create static metadata
export const metadata: Metadata = {
  title: "Change collection",
};

const CollectionPage = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("Admin"); // get page translation

  return (
    <CollectionForm
      texts={overkill(
        [
          "collectionForm.update",
          "collectionForm.nameReq",
          "collectionForm.textReq",
          "collectionForm.transReq",
          "collectionForm.header",
          "collectionForm.enText",
          "collectionForm.ukText",
          "collectionForm.banner",
          "collectionForm.poster",
          "collectionForm.discard",
          "collectionForm.private",
          "collectionForm.public",
          "collectionForm.publicButton",
          "collectionForm.confirm",
          "collectionForm.modalTitle",
          "collectionForm.modalClose",
        ],
        t
      )}
      params={params}
    />
  );
};

export default CollectionPage;
