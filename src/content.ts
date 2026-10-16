/**
 * All site copy lives here. Edit text, links and image paths in this file;
 * the components read from it and don't need to change.
 *
 * Image paths are relative to /public. If a file is missing, a styled
 * placeholder block renders in its place.
 */

export type Link = { label: string; href: string };
/** `position` is the CSS object-position focal point used when the slot crops the photo. */
export type Image = { src: string; alt: string; position?: string };
export type Tone = 'primary' | 'accent' | 'secondary';

export const site = {
  firstName: 'Leah',
  lastName: 'Corrigan',
  fullName: 'Leah Corrigan',
  /** Swap in a LinkedIn profile URL. */
  linkedinUrl: '#',
  /** Will become the booking (e.g. Calendly) link. */
  bookingUrl: '#',
};

export const banner =
  'Sample site by Lumon Studios: what a launch site for a Business of Coaching graduate could look like. Leah is a fictional coach.';

export const nav = {
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About me', href: '#about' },
    { label: 'Coaching', href: '#services' },
    { label: 'Insights', href: '#' },
    { label: 'Contact me', href: '#contact' },
  ] satisfies Link[],
  cta: { label: 'Book a free call', href: '#contact' } satisfies Link,
};

export const hero = {
  cta: { label: 'Book a call', href: '#contact' } satisfies Link,
  tagline: 'Leah helps new managers lead with confidence from day one.',
  headline: 'Lead, Grow, Thrive.',
  image: {
    src: 'images/hero.jpg',
    alt: 'A smiling woman in a green coat checking her phone between office towers',
    position: '62% 30%',
  } satisfies Image,
  stats: [
    { index: '01', value: '15 years', label: 'Corporate team leadership' },
    { index: '02', value: 'ICF Level 1', label: 'The Business of Coaching' },
    { index: '03', value: '1:1 coaching', label: 'Online & in person' },
    { index: '04', value: 'Free intro', label: '30-minute call' },
  ],
};

export const about = {
  eyebrow: 'About me',
  heading: 'Leah’s experience & approach',
  paragraphs: [
    'Leah Corrigan spent 15 years leading teams in corporate Australia, including the messy first year of managing people she used to sit beside. She knows how lonely that step up can feel.',
    'Now ICF Level 1 certified through The Business of Coaching, Leah helps new managers find their own leadership style, have the hard conversations and build teams that trust them, without losing themselves in the process.',
  ],
  cta: { label: 'Read my story', href: '#' } satisfies Link,
  signature: 'Leah Corrigan',
  portrait: {
    src: 'images/f7fc164660f4317d2181b1956e4b2fb7.jpg',
    alt: 'Portrait of Leah Corrigan',
    position: '50% 20%',
  } satisfies Image,
  secondary: {
    src: 'images/e81e46fc7b4931b6c7731f9126de1a21.jpg',
    alt: 'A smiling woman in a beige jacket holding her phone',
    position: '50% 25%',
  } satisfies Image,
};

export const who = {
  eyebrow: 'What I offer',
  heading: 'Who This Is For',
  intro:
    'This is for women stepping into management for the first time, or a few years in and still finding their feet. Whether you were promoted from within or hired in, ',
  emphasis:
    'my coaching helps you lead with confidence, handle the tough conversations and grow a team that actually wants to follow you.',
  featured: {
    title: 'Anyone New to Leading People',
    text: 'If you’ve got the title but not the playbook yet, this is for you.',
    image: {
      src: 'images/e4defa3c7c0eab091a5730ac48a45185.jpg',
      alt: 'A woman in a bright green jumper at her desk, holding her phone',
      position: '50% 22%',
    } satisfies Image,
  },
  cards: [
    {
      title: 'First-Time Managers',
      text: 'Promoted and figuring it out',
      image: { src: 'images/tegsb.jpg', alt: 'An empty meeting room with a long table', position: '50% 60%' },
      tone: 'primary',
    },
    {
      title: 'Emerging Leaders',
      text: 'Ready for the next step up',
      image: { src: 'images/hero.jpg', alt: 'A woman in a green coat among city office towers', position: '62% 28%' },
      tone: 'secondary',
    },
    {
      title: 'Returning to Work',
      text: 'Leading again after a career break',
      image: {
        src: 'images/e81e46fc7b4931b6c7731f9126de1a21.jpg',
        alt: 'A woman in a beige jacket smiling at the camera',
        position: '50% 18%',
      },
      tone: 'accent',
    },
  ] satisfies { title: string; text: string; image: Image; tone: Tone }[],
};

export const ways = {
  heading: 'Ways to Work Together',
  items: [
    {
      block: '01',
      tone: 'primary',
      icon: 'focus',
      title: 'Kickstart Session',
      text: 'A single 90-minute session to tackle one leadership challenge.',
      cta: { label: 'Book now', href: '#contact' },
    },
    {
      block: '03',
      tone: 'accent',
      icon: 'calendar',
      title: '3-Month Coaching',
      text: 'Fortnightly 1:1 sessions through your first months as a manager.',
      cta: { label: 'Enquire', href: '#contact' },
    },
    {
      block: 'TM',
      tone: 'secondary',
      icon: 'team',
      title: 'Team Workshops',
      text: 'Half-day sessions for organisations developing new managers.',
      cta: { label: 'Get in touch', href: '#contact' },
    },
  ] satisfies {
    block: string;
    tone: Tone;
    icon: 'focus' | 'calendar' | 'team';
    title: string;
    text: string;
    cta: Link;
  }[],
};

export const finalCta = {
  heading: 'Start with a conversation.',
  text: 'Book a free 30-minute call. Tell me where you’re at, and we’ll see if coaching is the right next step.',
  cta: { label: 'Book a free call', href: site.bookingUrl } satisfies Link,
};

export const footer = {
  copyright: '© Leah Corrigan · Australia',
  credit: { label: 'Sample site by Lumon Studios', href: 'https://lumonstudio.xyz' } satisfies Link,
};
