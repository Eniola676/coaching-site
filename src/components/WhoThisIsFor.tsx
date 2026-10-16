import { Fragment, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { who } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp } from '../lib/reveal';
import { Eyebrow } from './Eyebrow';
import { ImageCard } from './ImageCard';
import s from './WhoThisIsFor.module.css';

export function WhoThisIsFor() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = who.emphasis.split(' ');

  useGSAP(
    () => {
      if (reduced) return;
      const panel = root.current!.querySelector('[data-panel]')!;

      fadeUp('[data-reveal]', panel);

      // Bold sentence fills in word by word as you scroll.
      gsap.fromTo(
        '[data-scrub-word]',
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '[data-lead]',
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      );

      const cardIn = { y: 50, scale: 0.96, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 };
      gsap.from('[data-top] [data-card]', {
        ...cardIn,
        scrollTrigger: { trigger: '[data-top]', start: 'top 80%', once: true },
      });
      gsap.from('[data-cards] [data-card]', {
        ...cardIn,
        scrollTrigger: { trigger: '[data-cards]', start: 'top 88%', once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="offer" ref={root} className={s.section} aria-labelledby="who-heading">
      <div className="container">
        <div className={s.panel} data-panel>
          <div className={s.top} data-top>
            <div className={s.intro}>
              <Eyebrow data-reveal>{who.eyebrow}</Eyebrow>
              <h2 id="who-heading" className={s.heading} data-reveal>
                {who.heading}
              </h2>
              <p className={s.lead} data-reveal data-lead>
                <span className={s.soft}>{who.intro}</span>
                <strong className={s.strong}>
                  {words.map((w, i) => (
                    <Fragment key={i}>
                      <span data-scrub-word>{w}</span>
                      {i < words.length - 1 && ' '}
                    </Fragment>
                  ))}
                </strong>
              </p>
            </div>

            <ImageCard
              variant="featured"
              tilt
              image={who.featured.image}
              title={who.featured.title}
              text={who.featured.text}
              tone="primary"
              className={s.featured}
            />
          </div>

          <ul className={s.cards} data-cards>
            {who.cards.map((c) => (
              <li key={c.title}>
                <ImageCard image={c.image} title={c.title} text={c.text} tone={c.tone} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
