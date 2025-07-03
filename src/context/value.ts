"use client";
import { AppContextType, ProfileType } from "types";

// initial value of the global state in
export const globalContextInitialValue: (
  profile?: ProfileType,
) => AppContextType = (profile) => ({
  update: (...e) => {
    return "this one is going to change in container.tsx" + e.length;
  },
  profile: profile,
});
