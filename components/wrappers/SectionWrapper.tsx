import React, { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  title: string;
  text?: string;
  mobileText?: string;
  fullScreen?: boolean;
  className?: string;
};

const SectionWrapper = (props: WrapperProps) => {
  return (
    <div
      className={
        (props.fullScreen ? "min-h-screen " : "") +
        (props.className ? `${props.className} ` : "") +
        "border-t-2 border-b-2 border-blue-marguerite-700 dark:border-dark-grey px-phone md:px-tablet lg:px-pc pt-[70px] pb-5"
      }
    >
      <div className="text-center flex flex-col items-center mb-5">
        <h2 className="text-h3 sm:text-h2 max-w-[580px] w-full">
          {props.title}
        </h2>
        <p className="max-sm:hidden max-w-[980px] w-full">{props.text}</p>
        <p className="sm:hidden">{props.mobileText}</p>
      </div>
      {props.children}
    </div>
  );
};

export default SectionWrapper;
