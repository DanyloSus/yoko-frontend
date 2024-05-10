// external imports
import React from "react";

// internal imports
import { Link } from "@/modules/internationalization/navigation";

type CollectionProps = {
  id: number;
  title: string;
  image?: string;
  isNotLink?: boolean;
  gradient?: string[];
};

const CollectionTitle = (props: CollectionProps) => {
  return (
    <Link
      href={props.isNotLink ? "" : `/collection/${props.id}`}
      className={`w-full h-[200px] rounded-[8px] flex items-center justify-center font-kyiv text-h5 xl:text-h4 text-white max-sm:break-all p-[4px] text-center [text-shadow:0px_0px_4px_#000]`}
      style={
        props.gradient
          ? {
              backgroundImage: `linear-gradient(135deg, ${props.gradient[0]}, ${props.gradient[1]})`,
            }
          : {
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${props.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
      }
    >
      {props.title}
    </Link>
  );
};

export default CollectionTitle;
