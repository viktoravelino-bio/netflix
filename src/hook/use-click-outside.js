import { useEffect, useRef } from 'react';

const EVENTS = ['mousedown', 'touchstart'];

export function useClickOutside(handler) {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    EVENTS.forEach((event) => document.addEventListener(event, listener));
    return () => {
      EVENTS.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [ref, handler]);

  return ref;
}
