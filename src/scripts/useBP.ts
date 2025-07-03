"use client";
import { nextBrowser, useRealTimeState } from "scripts";
import { BPEnum } from "types";
import __useEventListener from "./useEventListener";
import { useEffect } from "react";

export default function UseBP() {
  const bp = useRealTimeState<BPEnum | null>(null);
  function detect() {
    if (nextBrowser.window) {
      const width = nextBrowser.window.innerWidth;
      if (width < BPEnum.XS) return BPEnum.XS;
      else if (width <= BPEnum.SM) return BPEnum.SM;
      else if (width <= BPEnum.MD) return BPEnum.MD;
      else if (width <= BPEnum.LG) return BPEnum.LG;
      else if (width <= BPEnum.XL) return BPEnum.XL;
      else return BPEnum.XXL;
    } else return null;
  }

  __useEventListener("resize", () => {
    const newBP = detect();
    if (newBP !== bp.get()) bp.set(newBP);
  });

  useEffect(() => {
    const newBP = detect();
    if (newBP !== bp.get()) bp.set(newBP);
  });

  if (bp.dep)
    return {
      bp: bp.dep,
      XS_LTE: bp.dep === BPEnum.XS,
      SM_LTE: bp.dep <= BPEnum.SM,
      MD_LTE: bp.dep <= BPEnum.MD,
      LG_LTE: bp.dep <= BPEnum.LG,
      XL_LTE: bp.dep <= BPEnum.XL,
      XXL_LTE: bp.dep <= BPEnum.XXL,
      XS_GTE: bp.dep >= BPEnum.XS,
      SM_GTE: bp.dep >= BPEnum.SM,
      MD_GTE: bp.dep >= BPEnum.MD,
      LG_GTE: bp.dep >= BPEnum.LG,
      XL_GTE: bp.dep >= BPEnum.XL,
      XXL_GTE: bp.dep === BPEnum.XXL,
      SM_LT: bp.dep < BPEnum.SM,
      MD_LT: bp.dep < BPEnum.MD,
      LG_LT: bp.dep < BPEnum.LG,
      XL_LT: bp.dep < BPEnum.XL,
      XXL_LT: bp.dep < BPEnum.XXL,
      XS_GT: bp.dep > BPEnum.XS,
      SM_GT: bp.dep > BPEnum.SM,
      MD_GT: bp.dep > BPEnum.MD,
      LG_GT: bp.dep > BPEnum.LG,
      XL_GT: bp.dep > BPEnum.XL,
    };
  else return null;
}
