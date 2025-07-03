"use client";
import { AppContextActionType, AppContextType } from "types";

// helper function for container.tsx
// check type and set given value to exact field of state in order to given type
export function globalStateSetter(
  e: AppContextActionType[],
  state: AppContextType,
): AppContextType {
  const newState: AppContextType = { ...state };
  for (const action of e) {
    console.log(action);
    // switch
  }
  return newState;
}
