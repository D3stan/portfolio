import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Returns a click handler that navigates to `path` on the second click
 * within `windowMs`. A single click keeps its normal behaviour.
 */
export function useSecretClick(path, windowMs = 500) {
  const navigate = useNavigate();
  const lastClick = useRef(0);

  return useCallback(
    (e) => {
      const now = Date.now();
      if (now - lastClick.current <= windowMs) {
        lastClick.current = 0;
        e?.preventDefault();
        navigate(path);
        return;
      }
      lastClick.current = now;
    },
    [navigate, path, windowMs]
  );
}
