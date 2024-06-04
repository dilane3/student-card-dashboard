import { useState, useEffect } from "react";

function useDebounceCallback(
  callback: Function,
  delay: number,
  dependencies: any[],
) {
  const [debouncedCallback, setDebouncedCallback] = useState(() => callback);

  useEffect(() => {
    setDebouncedCallback(() => {
      let timeoutId: number;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    });
  }, [
    ...dependencies,
    // , callback, delay
  ]);

  return debouncedCallback;
}

export default useDebounceCallback;
