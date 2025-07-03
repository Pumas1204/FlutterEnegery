"use client";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import LoadingComp from "power-grid/loading/loading.index";
import { createPortal } from "react-dom";
import { nextBrowser } from "scripts";
import { useParams } from "next/navigation";
import { __AppLinkCompType } from "./appLink.type";

const AppLinkComp: __AppLinkCompType = (props) => {
  const searchParamsSensitive =
    props.searchParamsSensitive === false ? false : true;
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const params = useParams();
  const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (urlDiff()) {
      if (props.preventReload) {
        e.preventDefault();
        e.stopPropagation();
      } else setLoading(true);
    }
  };
  const urlDiff = () => {
    if (ref.current) {
      const current = new URL(nextBrowser.window?.location.href ?? "");
      const next = new URL(ref.current.href);
      const str1 =
        next.protocol +
        next.host +
        next.pathname +
        (searchParamsSensitive ? next.search : "");
      const str2 =
        next.protocol +
        current.host +
        current.pathname +
        (searchParamsSensitive ? current.search : "");
      if (str1 !== str2) return true;
    }
    return false;
  };
  useEffect(() => {
    setLoading(false);
  }, [params]);
  return (
    <>
      <Link
        href={props.href}
        ref={ref}
        className={props.className}
        style={props.style}
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          onClickHandler(e);
        }}
        onMouseOver={props.onMouseOver}
      >
        {props.children}
      </Link>

      {loading
        ? createPortal(
            <LoadingComp />,
            nextBrowser.document?.body ?? document.body,
          )
        : null}
    </>
  );
};

export default AppLinkComp;
