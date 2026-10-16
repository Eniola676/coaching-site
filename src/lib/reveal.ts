import { gsap } from 'gsap';

/**
 * Standard section reveal: fade up 30px, staggered, once, when the trigger's
 * top reaches 80% of the viewport. Uses opacity (not visibility) so links
 * stay keyboard-focusable before they animate in.
 */
export function fadeUp(targets: gsap.TweenTarget, trigger: Element, vars: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger, start: 'top 80%', once: true },
    ...vars,
  });
}
