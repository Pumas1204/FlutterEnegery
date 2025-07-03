"use client";
import { useEffect, useRef } from "react";
import { __nextBrowser } from "./nextBrowser";

export default function UseEventListener<R = any>(
  eventName: string,
  handler: (e: R) => void,
  element?: Window | HTMLElement | Document | null,
  options: any = {},
) {
  // Create a ref that stores handler
  const savedHandler = useRef<((e: R) => void) | null>(null);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const el = !element ? __nextBrowser.window : element;
      // Make sure element supports addEventListener
      // On
      const isSupported = el?.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => {
        if (savedHandler.current) {
          savedHandler.current(event);
        }
      };

      // Add event listener
      el.addEventListener(eventName, eventListener, options);

      // Remove event listener on cleanup
      return () => {
        el.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element, options], // Re-run if eventName or element changes
  );
}
