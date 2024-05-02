import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  isDark?: boolean;
};

const FormWrapper = (props: Props) => {
  return (
    <div
      className="flex mx-auto max-w-[780px] w-full min-h-[483px] py-[32px] rounded-lg border-2 items-center justify-center text-center"
      style={{
        borderColor: props.isDark ? "black" : "rgb(86, 64, 194)",
        color: props.isDark ? "black" : "white",
      }}
    >
      <div className="flex flex-col gap-[24px] w-full items-center">
        <h3 className="text-h3">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
};

export default FormWrapper;
