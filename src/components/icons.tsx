import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.01c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.65V21h-4V9.75Z" />
    </svg>
  );
}

export function TeamIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="17" cy="16" r="6" />
      <circle cx="33" cy="18" r="5" />
      <path d="M6 38c0-6.6 5-11 11-11s11 4.4 11 11" />
      <path d="M28.5 29.5c1.3-.6 2.8-1 4.5-1 5 0 9 3.6 9 9.5" />
    </svg>
  );
}

export function FocusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="16" />
      <path d="m30 18-3.8 8.2L18 30l3.8-8.2L30 18Z" />
      <path d="M24 8v3M24 37v3M8 24h3M37 24h3" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="7" y="10" width="34" height="30" rx="4" />
      <path d="M7 19h34M16 6v8M32 6v8" />
      <path d="m18 29 4 4 8-8" />
    </svg>
  );
}

function PersonGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true" {...props}>
      <circle cx="24" cy="18" r="8" />
      <path d="M8 44c0-9 7.2-15 16-15s16 6 16 15" />
    </svg>
  );
}

function FrameGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="6" y="10" width="36" height="28" rx="4" />
      <circle cx="17" cy="20" r="3.5" />
      <path d="m6 33 10-9 8 7 6-5 12 9" />
    </svg>
  );
}

export const PlaceholderGlyph = { person: PersonGlyph, frame: FrameGlyph };
