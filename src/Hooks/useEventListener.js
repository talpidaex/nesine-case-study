import { useEffect, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

const useEventListener = (eventName, handler, element) => {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element?.current ?? window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }
    // Create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
