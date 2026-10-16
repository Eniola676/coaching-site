import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { finalCta } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp } from '../lib/reveal';
import { PillButton } from './PillButton';
import s from './FinalCTA.module.css';

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      fadeUp('[data-reveal]', root.current!);
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="contact" ref={root} className={`${s.cta} on-dark`} aria-labelledby="cta-heading">
      <div className={`container ${s.inner}`}>
        <h2 id="cta-heading" className={s.heading} data-reveal>
          {finalCta.heading}
        </h2>
        <p className={s.text} data-reveal>
          {finalCta.text}
        </p>
        <div className={s.action} data-reveal>
          <PillButton href={finalCta.cta.href} variant="accent" size="lg">
            {finalCta.cta.label}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
