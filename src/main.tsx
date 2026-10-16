import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import App from './App';
import './styles/globals.css';

// Register once for the whole app.
gsap.registerPlugin(ScrollTrigger, useGSAP);
// Stops mobile address-bar show/hide from triggering a full refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
