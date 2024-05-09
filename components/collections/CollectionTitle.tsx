// external imports
import React from "react";

// internal imports
import { Link } from "@/modules/internationalization/navigation";

type CollectionProps = {
  id: number;
  title: string;
};

const CollectionTitle = (props: CollectionProps) => {
  return (
    <Link
      href={`/collection/${props.id}`}
      className={`w-full h-[200px] rounded-[8px] flex items-center justify-center font-kyiv text-h5 xl:text-h4 text-white break-all p-[4px] text-center`}
      style={{}}
    ></Link>
  );
};

export default CollectionTitle;
