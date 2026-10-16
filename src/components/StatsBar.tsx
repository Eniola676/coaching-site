import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import s from './StatsBar.module.css';

type Stat = { index: string; value: string; label: string };
type Props = { stats: Stat[]; introDelay?: number };

/** Splits "15 years" into a countable number and the rest. Values like "1:1 coaching" are left alone. */
function splitValue(value: string) {
  const m = value.match(/^(\d+)(\+?\s.*)$/);
  return m ? { num: Number(m[1]), rest: m[2] } : null;
}

export function StatsBar({ stats, introDelay = 0 }: Props) {
  const root = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mountedAt = performance.now();
      const nums = gsap.utils.toArray<HTMLElement>('[data-count]');

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });
      tl.from('[data-line]', { scaleX: 0, duration: 1, ease: 'power2.inOut', stagger: 0.12 })
        .from('[data-stat-text]', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .add(() => {
          nums.forEach((el) => {
            const target = Number(el.dataset.count);
            const counter = { v: 0 };
            gsap.to(counter, {
              v: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = String(Math.round(counter.v));
              },
            });
          });
        }, 0.9);
      // Start counters at zero so they don't flash the final value first.
      nums.forEach((el) => (el.textContent = '0'));

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom-=40',
        once: true,
        onEnter: () => {
          // On first load, wait for the headline; when scrolled to later, play straight away.
          const elapsed = (performance.now() - mountedAt) / 1000;
          gsap.delayedCall(Math.max(0, introDelay - elapsed), () => void tl.play());
        },
      });

      return () => nums.forEach((el) => (el.textContent = el.dataset.count ?? ''));
    },
    { scope: root, dependencies: [reduced, introDelay], revertOnUpdate: true },
  );

  return (
    <ul ref={root} className={s.stats}>
      {stats.map((stat) => {
        const parts = splitValue(stat.value);
        return (
          <li key={stat.index} className={s.stat}>
            <span className={s.line} data-line aria-hidden="true" />
            <div className={s.top} data-stat-text>
              <span className={s.index} aria-hidden="true">
                {stat.index}
              </span>
              <span className={s.value}>
                {parts ? (
                  <>
                    <span aria-hidden="true" data-count={parts.num}>
                      {parts.num}
                    </span>
                    <span aria-hidden="true">{parts.rest}</span>
                    <span className="visually-hidden">{stat.value}</span>
                  </>
                ) : (
                  stat.value
                )}
              </span>
            </div>
            <span className={s.label} data-stat-text>
              {stat.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
