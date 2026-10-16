import { Fragment, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { hero } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PillButton } from './PillButton';
import { Photo } from './Photo';
import { StatsBar } from './StatsBar';
import s from './Hero.module.css';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = hero.headline.split(' ');

  useGSAP(
    () => {
      if (reduced) return;

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-img]', { scale: 1.08, duration: 1.6 }, 0)
        .from('[data-word]', { yPercent: 115, duration: 1.1, stagger: 0.08 }, 0.25)
        .from('[data-hero-fade]', { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.75);

      // Background drifts slower than the page.
      gsap.to('[data-parallax]', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="home" ref={root} className={`${s.hero} on-dark`} aria-label="Introduction">
      <div className={s.media} data-parallax>
        <div className={s.mediaInner} data-hero-img>
          <Photo image={hero.image} tone="primary" priority />
        </div>
      </div>
      <div className={s.overlay} aria-hidden="true" />

      <div className={`container ${s.inner}`}>
        <div className={s.content}>
          <div data-hero-fade>
            <PillButton href={hero.cta.href} size="sm">
              {hero.cta.label}
            </PillButton>
          </div>
          <p className={s.tagline} data-hero-fade>
            {hero.tagline}
          </p>
          <h1 className={s.headline}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className={s.mask}>
                  <span className={s.word} data-word>
                    {w}
                  </span>
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
        </div>

        <StatsBar stats={hero.stats} introDelay={0.95} />
      </div>
    </section>
  );
}
