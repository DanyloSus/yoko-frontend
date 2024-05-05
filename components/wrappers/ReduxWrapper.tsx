// provider needs CSE
"use client";

// external imports
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

// internal imports
import store from "@/modules/redux/store";

// wrapper to separate content of page from Provider that needs CSR
const ReduxWrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
