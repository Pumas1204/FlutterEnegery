"use client";
import { useState } from "react";

export default function UseAsyncClick(
  callBack: (e: any) => Promise<any | undefined> | void,
) {
  const [loading, setLoading] = useState(false);

  const onClickHandler = (e?: any) => {
    const returned = callBack(e);
    if (returned) {
      setLoading(true);
      returned
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return { onClick: onClickHandler, loading: loading };
}
