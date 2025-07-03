"use client";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function UseThen(
  callBack: EffectCallback,
  deps: DependencyList,
) {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) callBack();
    ref.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
