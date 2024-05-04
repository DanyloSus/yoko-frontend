import Link from "next/link";
import React from "react";

type CollectionProps = {
  id: number;
  title: string;
};

const CollectionTitle = (props: CollectionProps) => {
  return (
    <Link
      href={`/collection/${props.id}`}
      className="w-full h-[200px] bg-gradient-to-br from-blue-marguerite-400 to-blue-marguerite-700 rounded-[8px] flex items-center justify-center font-kyiv text-h4 text-white"
    >
      {props.title}
    </Link>
  );
};

export default CollectionTitle;
