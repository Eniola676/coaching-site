import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { hasFinePointer, useReducedMotion } from './useReducedMotion';

type Options = { enabled?: boolean; max?: number };

/** Gentle 3D tilt that follows the cursor. Desktop only; off for reduced motion. */
export function useTilt<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, max = 6 }: Options = {},
) {
  const reduced = useReducedMotion();

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !enabled || reduced || !hasFinePointer()) return;

      gsap.set(el, { transformPerspective: 1000 });
      const ease = { duration: 0.8, ease: 'power3.out' };
      const rxTo = gsap.quickTo(el, 'rotationX', ease);
      const ryTo = gsap.quickTo(el, 'rotationY', ease);

      const onMove = contextSafe!((e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const px = gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width) - 0.5;
        const py = gsap.utils.clamp(0, 1, (e.clientY - r.top) / r.height) - 0.5;
        ryTo(px * 2 * max);
        rxTo(-py * 2 * max);
      });

      const onLeave = contextSafe!(() => {
        rxTo(0);
        ryTo(0);
      });

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    },
    { dependencies: [enabled, reduced, max], revertOnUpdate: true },
  );
}
