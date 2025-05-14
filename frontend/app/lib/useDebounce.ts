
import { useRef, useEffect, useCallback } from "react";

/**
 * useDebounce
 * Returns a stable debounced version of `cb`
 * that fires `delay` ms after the last call.
 */
export function useDebounce<T extends (...args: any[]) => void>(
  cb: T,
  delay = 300
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );

  /* clear timer on unmount */
  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  return debounced;
}
