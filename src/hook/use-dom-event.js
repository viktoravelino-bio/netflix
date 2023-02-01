import { useEffect } from 'react';

export function useDomEvent(element, event, handler) {
  useEffect(() => {
    if (!element) return;

    element.current?.addEventListener(event, handler);

    return () => {
      element.current?.removeEventListener(event, handler);
    };
  }, [element, handler]);
}
