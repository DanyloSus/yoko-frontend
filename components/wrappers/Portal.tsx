// hooks need SSR
"use client";

// import from libraries
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactNode }) => {
  // state to check is elemenent "modal" exists
  const [domReady, setDomReady] = useState(false);

  // run when dom is ready
  useEffect(() => {
    setDomReady(true);
  }, []);

  var menuRoot; // var of modal element

  if (domReady) {
    // if dom is ready then we set our modal
    menuRoot = document.getElementById("modal");
  }

  return domReady
    ? createPortal(
        // creating portal if dom is ready
        <div className="w-screen h-screen overflow-hidden absolute top-0">
          {children}
        </div>,
        menuRoot!
      )
    : null;
};
export default Portal;
