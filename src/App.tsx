import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Banner } from './components/Banner';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhoThisIsFor } from './components/WhoThisIsFor';
import { WaysToWork } from './components/WaysToWork';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  // Web fonts and late images can change section heights after first
  // paint; re-measure trigger positions once they've settled.
  useEffect(() => {
    let cancelled = false;
    const refresh = () => !cancelled && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Banner />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <WhoThisIsFor />
        <WaysToWork />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
