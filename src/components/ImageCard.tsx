import { useRef } from 'react';
import type { Image, Tone } from '../content';
import { useTilt } from '../hooks/useTilt';
import { Photo } from './Photo';
import s from './ImageCard.module.css';

type Props = {
  image: Image;
  title: string;
  text: string;
  variant?: 'featured' | 'small';
  tone?: Tone;
  tilt?: boolean;
  className?: string;
};

export function ImageCard({ image, title, text, variant = 'small', tone = 'primary', tilt = false, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  useTilt(ref, { enabled: tilt, max: 6 });

  return (
    <article ref={ref} className={[s.card, s[variant], className].filter(Boolean).join(' ')} data-card>
      <div className={s.media}>
        <Photo image={image} tone={tone} glyph="person" />
      </div>
      <div className={s.shade} aria-hidden="true" />
      <div className={s.body}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.text}>{text}</p>
      </div>
    </article>
  );
}
