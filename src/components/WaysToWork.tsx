import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ways } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp } from '../lib/reveal';
import { PillButton } from './PillButton';
import { CalendarIcon, FocusIcon, TeamIcon } from './icons';
import s from './WaysToWork.module.css';

const icons = { focus: FocusIcon, calendar: CalendarIcon, team: TeamIcon };

export function WaysToWork() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      fadeUp('[data-reveal]', root.current!);
      gsap.from('[data-way]', {
        x: 90,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '[data-ways]', start: 'top 80%', once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="services" ref={root} className={s.section} aria-labelledby="ways-heading">
      <div className="container">
        <h2 id="ways-heading" className={s.heading} data-reveal>
          {ways.heading}
        </h2>

        <ul className={s.list} data-ways>
          {ways.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className={s.card} data-way>
                <div className={`${s.block} ${s[item.tone]}`} aria-hidden="true">
                  <span>{item.block}</span>
                </div>
                <div className={s.body}>
                  <h3 className={s.title}>{item.title}</h3>
                  <p className={s.text}>{item.text}</p>
                  <PillButton href={item.cta.href} variant="outline" size="sm" arrow={false} className={s.button}>
                    {item.cta.label}
                  </PillButton>
                </div>
                <div className={`${s.visual} ${s[`${item.tone}Visual`]}`} aria-hidden="true">
                  <Icon className={s.icon} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
