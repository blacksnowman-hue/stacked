import { useRef } from 'react';

export function useMinimumActionInterval(minIntervalMs) {
  const lastTimeRef = useRef(0);

  return {
    preventActionOrPrepareAndContinue() {
      const now = Date.now();
      const timeElapsed = now - lastTimeRef.current;

      if (timeElapsed < minIntervalMs) {
        return true; // prevent action
      }

      lastTimeRef.current = now;
      return false; // don't prevent action
    },
  };
} 