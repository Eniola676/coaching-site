import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { hasFinePointer, useReducedMotion } from './useReducedMotion';

type Options = {
  enabled?: boolean;
  /** Max drift of the element in px. */
  strength?: number;
  /** A child (e.g. the arrow circle) that drifts a little further. */
  innerSelector?: string;
  innerStrength?: number;
};

/**
 * Pulls an element slightly toward the cursor while hovered and springs it
 * back on leave. Desktop only; off when reduced motion is requested.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, strength = 8, innerSelector, innerStrength = 5 }: Options = {},
) {
  const reduced = useReducedMotion();

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !enabled || reduced || !hasFinePointer()) return;

      const inner = innerSelector ? el.querySelector<HTMLElement>(innerSelector) : null;
      const spring = { duration: 1, ease: 'elastic.out(1, 0.4)' };
      const xTo = gsap.quickTo(el, 'x', spring);
      const yTo = gsap.quickTo(el, 'y', spring);
      const ixTo = inner ? gsap.quickTo(inner, 'x', spring) : null;
      const iyTo = inner ? gsap.quickTo(inner, 'y', spring) : null;

      const onMove = contextSafe!((e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        // -1..1 from the centre of the element
        const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2));
        const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2));
        xTo(nx * strength);
        yTo(ny * strength * 0.6);
        ixTo?.(nx * innerStrength);
        iyTo?.(ny * innerStrength * 0.6);
      });

      const onLeave = contextSafe!(() => {
        xTo(0);
        yTo(0);
        ixTo?.(0);
        iyTo?.(0);
      });

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    },
    { dependencies: [enabled, reduced, strength, innerSelector, innerStrength], revertOnUpdate: true },
  );
}
