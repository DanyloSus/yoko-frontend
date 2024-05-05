// external imports
import React, { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  title?: string;
  isDark?: boolean;
};

// basic form use primary colors so if you want normal black borders use "isDark"
const FormWrapper = (props: FormProps) => {
  return (
    <div
      className="flex mx-auto max-w-[780px] w-full min-h-[483px] py-[32px] rounded-lg border-2 items-center justify-center text-center"
      style={{
        borderColor: props.isDark ? "black" : "rgb(86, 64, 194)",
        color: props.isDark ? "black" : "white",
      }}
    >
      <div className="flex max-w-[380px] w-full flex-col gap-[24px] items-center">
        {props.title ? (
          <h3 className="text-h3 whitespace-nowrap">{props.title}</h3>
        ) : null}
        {props.children}
      </div>
    </div>
  );
};

export default FormWrapper;
