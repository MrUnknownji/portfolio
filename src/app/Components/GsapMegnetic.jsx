import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

let isWindowsOrMac = false;
if (typeof navigator !== "undefined") {
  isWindowsOrMac = /(Windows|Macintosh|Mac Os)/i.test(navigator.userAgent);
}

const GsapMegnetic = ({ children }) => {
  const ref = useRef();
  useLayoutEffect(() => {
    if (isWindowsOrMac) {
      const currentElem = ref.current;
      const xTo = gsap.quickTo(currentElem, "x", {
        duration: 1,
        ease: "elastic.out(1,0.3)",
      });
      const yTo = gsap.quickTo(currentElem, "y", {
        duration: 1,
        ease: "elastic.out(1,0.3)",
      });
      const mouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } =
          currentElem.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x);
        yTo(y);
      };
      const mouseLeave = (e) => {
        xTo(0);
        yTo(0);
      };
      currentElem.addEventListener("mousemove", mouseMove);
      currentElem.addEventListener("mouseleave", mouseLeave);
      return () => {
        currentElem.removeEventListener("mousemove", mouseMove);
        currentElem.removeEventListener("mouseleave", mouseLeave);
      };
    }
  }, []);
  return React.cloneElement(children, { ref });
};

export default GsapMegnetic;
