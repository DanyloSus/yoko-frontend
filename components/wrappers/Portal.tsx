//hooks need SSR
"use client";

//import from libraries
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

//portal's children
type Portal = {
  children: ReactNode;
};

const Portal = ({ children }: Portal) => {
  //state to check is elemenent "menu" exists
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  var menuRoot;

  if (domReady) {
    menuRoot = document.getElementById("modal");
  }

  return domReady
    ? createPortal(
        <div className="w-screen h-screen overflow-hidden absolute top-0">
          {children}
        </div>,
        menuRoot!
      )
    : null;
};
export default Portal;
