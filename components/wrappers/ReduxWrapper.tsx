//provider needs
"use client";

//import from libraries
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

//internal imports
import store from "@/modules/redux/store";

const ReduxWrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
