import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { nav, site } from '../content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PillButton } from './PillButton';
import { LinkedInIcon } from './icons';
import s from './Nav.module.css';

const SOLID_AFTER = 40;
const HIDE_AFTER = 160;
const DESKTOP_QUERY = '(min-width: 961px)';

export function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hiddenRef = useRef(false);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(() => typeof window !== 'undefined' && window.scrollY > SOLID_AFTER);
  const reduced = useReducedMotion();

  openRef.current = open;

  const setHidden = useCallback((hide: boolean) => {
    if (hiddenRef.current === hide) return;
    hiddenRef.current = hide;
    gsap.to(headerRef.current, {
      yPercent: hide ? -110 : 0,
      duration: hide ? 0.45 : 0.6,
      ease: hide ? 'power2.in' : 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current!;
      if (!reduced) {
        gsap.from(header, { y: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 });
      }

      // Solid background past the hero's top edge; hide on scroll down, show on scroll up.
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          setSolid(y > SOLID_AFTER);
          if (reduced || openRef.current) return;
          if (self.direction === 1 && y > HIDE_AFTER) setHidden(true);
          else if (self.direction === -1) setHidden(false);
        },
      });

      return () => {
        gsap.killTweensOf(header);
        hiddenRef.current = false;
        gsap.set(header, { clearProps: 'transform' });
      };
    },
    { scope: headerRef, dependencies: [reduced], revertOnUpdate: true },
  );

  // Mobile menu: stagger links in each time it opens.
  useGSAP(
    () => {
      if (!open || reduced) return;
      gsap.fromTo(
        '[data-menu-item]',
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07, delay: 0.12 },
      );
    },
    { scope: menuRef, dependencies: [open, reduced] },
  );

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Lock scroll, make the page inert, handle Escape and resize while open.
  useEffect(() => {
    if (!open) return;
    setHidden(false);
    const main = document.getElementById('main');
    const footer = document.querySelector('footer');
    document.documentElement.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    menuRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close(true);
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onMq = () => mq.matches && close();
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.documentElement.style.overflow = '';
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close, setHidden]);

  const headerCls = [s.header, 'on-dark', solid || open ? s.solid : ''].filter(Boolean).join(' ');

  return (
    <>
      <header ref={headerRef} className={headerCls} onFocusCapture={() => setHidden(false)}>
        <nav className={`container ${s.bar}`} aria-label="Main">
          <a href="#home" className={s.logo} aria-label={`${site.fullName}, home`} onClick={() => close()}>
            <span>{site.firstName}</span>
            <span>{site.lastName}</span>
          </a>

          <ul className={s.links}>
            {nav.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={s.link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={s.actions}>
            <a href={site.linkedinUrl} className={s.iconCircle} aria-label="LinkedIn" target={site.linkedinUrl === '#' ? undefined : '_blank'} rel="noreferrer">
              <LinkedInIcon width={15} height={15} />
            </a>
            <PillButton href={nav.cta.href} size="sm" arrow={false} className={s.cta}>
              {nav.cta.label}
            </PillButton>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={`${s.toggle} ${open ? s.toggleOpen : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${s.menu} on-dark ${open ? s.menuOpen : ''}`}
      >
        <div className={`container ${s.menuInner}`}>
          <ul className={s.menuLinks}>
            {nav.links.map((l) => (
              <li key={l.label} className={s.menuItem}>
                <a href={l.href} data-menu-item onClick={() => close()}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={s.menuFoot} data-menu-item>
            <PillButton href={nav.cta.href} size="lg" onClick={() => close()}>
              {nav.cta.label}
            </PillButton>
            <a href={site.linkedinUrl} className={s.iconCircle} aria-label="LinkedIn">
              <LinkedInIcon width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
