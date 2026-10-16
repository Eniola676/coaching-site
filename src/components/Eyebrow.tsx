import type { HTMLAttributes } from 'react';
import s from './Eyebrow.module.css';

type Props = HTMLAttributes<HTMLParagraphElement> & { tone?: 'light' | 'dark' };

/** Small « Label » above section headings. */
export function Eyebrow({ children, tone = 'light', className, ...rest }: Props) {
  return (
    <p className={[s.eyebrow, tone === 'dark' ? s.onDark : '', className].filter(Boolean).join(' ')} {...rest}>
      <span className={s.chev} aria-hidden="true">«</span>
      {children}
      <span className={s.chev} aria-hidden="true">»</span>
    </p>
  );
}
