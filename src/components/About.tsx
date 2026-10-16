import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { about } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp } from '../lib/reveal';
import { Eyebrow } from './Eyebrow';
import { PillButton } from './PillButton';
import { Photo } from './Photo';
import s from './About.module.css';

export function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const trigger = { trigger: root.current, start: 'top 80%', once: true };

      fadeUp('[data-reveal]', root.current!.querySelector('[data-text]')!);

      gsap.from('[data-portrait]', {
        x: -60,
        rotation: -3,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
        transformOrigin: '50% 100%',
        scrollTrigger: trigger,
      });

      gsap.from('[data-float]', {
        y: 70,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.25,
        scrollTrigger: trigger,
      });

      gsap.fromTo(
        '[data-signature]',
        { clipPath: 'inset(-20% 100% -20% 0%)' },
        {
          clipPath: 'inset(-20% 0% -20% 0%)',
          duration: 1.6,
          ease: 'power2.inOut',
          delay: 0.7,
          scrollTrigger: trigger,
        },
      );
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="about" ref={root} className={s.about} aria-labelledby="about-heading">
      <div className={`container ${s.grid}`}>
        <div className={s.portraitCol}>
          <div className={s.portrait} data-portrait>
            <Photo image={about.portrait} tone="secondary" glyph="person" />
          </div>
          <div className={s.signature} data-signature aria-hidden="true">
            <span>{about.signature}</span>
            <svg viewBox="0 0 220 30" fill="none" className={s.flourish}>
              <path d="M4 22c40-10 92-16 150-14 22 1 42 4 62 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className={s.text} data-text>
          <Eyebrow data-reveal>{about.eyebrow}</Eyebrow>
          <h2 id="about-heading" className={s.heading} data-reveal>
            {about.heading}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className={s.body} data-reveal>
              {p}
            </p>
          ))}
          <div className={s.cta} data-reveal>
            <PillButton href={about.cta.href} variant="gradient" size="md">
              {about.cta.label}
            </PillButton>
          </div>
        </div>

        <div className={s.sideCol}>
          <div className={s.side} data-float>
            <Photo image={about.secondary} tone="primary" glyph="person" />
          </div>
        </div>
      </div>
    </section>
  );
}
