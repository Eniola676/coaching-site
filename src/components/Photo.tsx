import { useState } from 'react';
import type { Image, Tone } from '../content';
import { PlaceholderGlyph } from './icons';
import s from './Photo.module.css';

type Props = {
  image: Image;
  tone?: Tone;
  glyph?: keyof typeof PlaceholderGlyph;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the image, or a styled placeholder block if the file is missing.
 * Both fill their parent, so swapping between them never shifts layout.
 */
export function Photo({ image, tone = 'primary', glyph = 'frame', priority = false, className }: Props) {
  const [failed, setFailed] = useState(false);
  const src = image.src.startsWith('/') || image.src.startsWith('http') ? image.src : import.meta.env.BASE_URL + image.src;
  const cls = [s.fill, className].filter(Boolean).join(' ');

  if (failed) {
    const Glyph = PlaceholderGlyph[glyph];
    return (
      <div role="img" aria-label={image.alt} className={`${cls} ${s.placeholder} ${s[tone]}`}>
        <Glyph className={s.glyph} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={image.alt}
      className={`${cls} ${s.img}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={image.position ? { objectPosition: image.position } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
