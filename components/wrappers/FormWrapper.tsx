import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const FormWrapper = (props: Props) => {
  return (
    <div className="flex  max-w-[780px] w-full min-h-[483px] py-[12px] rounded-lg border-2 border-blue-marguerite-700  items-center justify-center  text-white">
      <div className="flex flex-col gap-[24px] max-w-[381px] w-full items-center">
        <h3 className="text-h3">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
};

export default FormWrapper;
