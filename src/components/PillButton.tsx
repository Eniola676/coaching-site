import { useRef, type MouseEvent, type ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import { ArrowIcon } from './icons';
import s from './PillButton.module.css';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'light' | 'gradient' | 'outline' | 'outlineLight' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function PillButton({
  href,
  children,
  variant = 'light',
  size = 'md',
  arrow = true,
  magnetic = true,
  className,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { enabled: magnetic, innerSelector: arrow ? '[data-arrow]' : undefined });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Placeholder links shouldn't jump the page to the top.
    if (href === '#') e.preventDefault();
    onClick?.(e);
  };

  const cls = [s.pill, s[variant], s[size], arrow ? s.withArrow : '', className].filter(Boolean).join(' ');

  return (
    <a ref={ref} href={href} className={cls} onClick={handleClick}>
      <span className={s.label}>{children}</span>
      {arrow && (
        <span className={s.arrow} data-arrow aria-hidden="true">
          <ArrowIcon className={s.arrowIcon} />
        </span>
      )}
    </a>
  );
}
