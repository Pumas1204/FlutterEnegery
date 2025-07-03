export const __nextBrowser = {
  document: typeof document !== "undefined" ? document : null,
  window: typeof window !== "undefined" ? window : null,
  localStorage: typeof localStorage !== "undefined" ? localStorage : null,
  sessionStorage: typeof sessionStorage !== "undefined" ? sessionStorage : null,
  navigator: typeof navigator !== "undefined" ? navigator : null,
};
