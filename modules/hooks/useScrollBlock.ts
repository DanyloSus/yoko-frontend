// external imports
import { useState } from "react";

// get document if it loaded
const safeDocument: any = typeof document !== "undefined" ? document : {};

// https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
const useScrollBlock = () => {
  const [scrollBlocked, setScrollBlocked] = useState(false); // state for checking is scrolling blocked
  const html = safeDocument.documentElement; // get html
  const { body } = safeDocument; // get body

  // functional for blocking scroll
  const blockScroll = () => {
    // body isn't loaded or styles aren't loaded or scroll
    // already blocked
    if (!body || !body.style || scrollBlocked) return;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    // set styles
    html.style.overflow = "hidden"; /* [2] */
    body.style.overflow = "hidden"; /* [2] */

    setScrollBlocked(true);
  };

  // functional for allowing scroll
  const allowScroll = () => {
    // body isn't loaded or styles aren't loaded or scroll
    // already allowed
    if (!body || !body.style || !scrollBlocked) return;

    // cleaning styles
    html.style.overflow = "";
    body.style.overflow = "";

    setScrollBlocked(false);
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
