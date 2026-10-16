import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** True when the visitor has asked the OS to reduce motion. Updates live. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Desktop-style pointer: a mouse or trackpad that can hover. */
export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
