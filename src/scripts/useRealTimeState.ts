"use client";
import { useRef, useState } from "react";

function UseRealTimeState<T>(initialValue: T): {
  dep: T;
  get: () => T;
  set: (e: T) => void;
} {
  const ref = useRef<T>(initialValue);
  const [state, setState] = useState<T>(initialValue);

  const setValue = (value: T) => {
    ref.current = value;
    setState(ref.current);
  };

  return { dep: state, get: () => ref.current, set: setValue };
}

export default UseRealTimeState;
