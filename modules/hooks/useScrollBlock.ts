import { useState } from "react";

const safeDocument: any = typeof document !== "undefined" ? document : {};

// https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
const useScrollBlock = () => {
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked) return;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.overflow = "hidden"; /* [2] */
    body.style.overflow = "hidden"; /* [2] */

    setScrollBlocked(true);
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    setScrollBlocked(false);
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
