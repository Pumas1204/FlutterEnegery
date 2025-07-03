"use client";
import { useEffect } from "react";
import { nextBrowser } from ".";

const UseOnBlur = (ref: React.RefObject<any>[], callback: () => void) => {
  const dep = ref.map((item) => item.current);
  useEffect(() => {
    const handleClick = (e: { target: any }) => {
      if (
        ref.length &&
        !ref.map((item) => !!item.current).includes(false) &&
        !ref?.map((item) => item.current.contains(e.target)).includes(true)
      ) {
        callback();
      }
    };
    nextBrowser.document?.addEventListener("click", handleClick);

    return () => {
      nextBrowser.document?.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep, callback]);
};

export default UseOnBlur;
