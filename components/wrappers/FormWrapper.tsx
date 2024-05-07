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
      className="flex mx-auto sm:max-w-[676px] lg:max-w-[780px] w-full sm:min-h-[483px] sm:py-[32px] rounded-lg  sm:border-2 items-center justify-center text-center relative"
      style={{
        borderColor: props.isDark ? "black" : "rgb(86, 64, 194)",
        color: props.isDark ? "black" : "white",
      }}
    >
      <div className="flex sm:max-w-[429px] lg:max-w-[380px] w-full flex-col gap-[10px] md:gap-[20px] lg:gap-[24px] max-md:px-phone items-center">
        {props.title ? (
          <h3 className="text-h4 sm:text-h3 sm:whitespace-nowrap">
            {props.title}
          </h3>
        ) : null}
        {props.children}
      </div>
    </div>
  );
};

export default FormWrapper;
