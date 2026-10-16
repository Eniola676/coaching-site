import { useLayoutEffect, useRef } from 'react';
import { banner } from '../content';
import s from './Banner.module.css';

/**
 * Fixed "sample site" notice above the nav. Always visible and never animated.
 * Publishes its height as --banner-h so the nav, hero and menu sit below it,
 * even when the text wraps on narrow screens.
 */
export function Banner() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--banner-h', `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={s.banner} role="note">
      <p className={`container ${s.text}`}>{banner}</p>
    </div>
  );
}
