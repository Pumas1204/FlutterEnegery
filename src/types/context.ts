// type of the global state in context

import { __ProfileType } from "./power-grid";

// you can expand this one and add new fields to it
export interface __AppContextType {
  update: (...e: __AppContextActionType[]) => void;
  profile: __ProfileType | undefined;
}

// type of update function of global state single argument
// you can expand this one and add a {key, value} per filed you add to global state
export type __AppContextActionType = {
  key: __AppContextActionKeyEnum.profile;
  value?: __ProfileType;
};

// keys of the update function argument in global state
// you can expand this one and add a unique key per filed you add to global state
export enum __AppContextActionKeyEnum {
  profile = "CONTEXT_USER_PROFILE",
}
