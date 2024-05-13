// external imports
import React from "react";

// internal imports
import { Link } from "@/modules/internationalization/navigation";
import Image from "next/image";
import "./CollectionTitle.scss";
import LoadingTitle from "./LoadingTitle";

type CollectionProps = {
  id?: number;
  title?: string;
  image?: string;
  isNotLink?: boolean;
  gradient?: string[];
  isLoading?: boolean;
};

const CollectionTitle = (props: CollectionProps) => {
  const element = (
    <>
      {props.image && props.title ? (
        <Image
          src={props.image}
          alt={props.title}
          width={200}
          height={200}
          className="absolute w-full h-[200px] object-cover"
        />
      ) : null}
      <h4
        className="relative z-10 w-full h-[200px] flex items-center justify-center"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))",
        }}
      >
        {props.title}
      </h4>
    </>
  );

  const baseStyle =
    "w-full h-[200px] rounded-[8px] flex items-center justify-center font-kyiv text-h5 xl:text-h4 text-white max-sm:break-all text-center [text-shadow:0px_0px_4px_#000] relative overflow-hidden";

  return props.isLoading ? (
    <LoadingTitle className={baseStyle + " loadingTitle"} />
  ) : props.isNotLink ? (
    <div
      className={baseStyle}
      style={{
        backgroundImage: props.gradient
          ? `linear-gradient(135deg, ${props.gradient[0]}, ${props.gradient[1]})`
          : "",
      }}
    >
      {element}
    </div>
  ) : (
    <Link
      href={props.isNotLink ? "" : `/collection/${props.id}`}
      className={baseStyle}
    >
      {element}
    </Link>
  );
};

export default CollectionTitle;
