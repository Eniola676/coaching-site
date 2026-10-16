import { footer } from '../content';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`${s.footer} on-dark`}>
      <div className={`container ${s.inner}`}>
        <div className={s.row}>
          <p className={s.copy}>{footer.copyright}</p>
          <a href={footer.credit.href} className={s.credit} target="_blank" rel="noopener noreferrer">
            {footer.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
