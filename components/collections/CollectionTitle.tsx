// external imports
import React from "react";

// internal imports
import { Link } from "@/modules/internationalization/navigation";

type CollectionProps = {
  id: number;
  title: string;
  image: string;
};

const CollectionTitle = (props: CollectionProps) => {
  return (
    <Link
      href={`/collection/${props.id}`}
      className={`w-full h-[200px] rounded-[8px] flex items-center justify-center font-kyiv text-h5 xl:text-h4 text-white break-all p-[4px] text-center [text-shadow:0px_0px_4px_#000]`}
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${props.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {props.title}
    </Link>
  );
};

export default CollectionTitle;
