import s from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.content}>
        <ul className={s.list}>
          <li className={s.item}>
            <a href="/" className={s.content__link}>
              About
            </a>
          </li>

          <li className={s.item}>
            <a href="/" className={s.content__link}>
              Terms of Service
            </a>
          </li>

          <li className={s.item}>
            <a href="/" className={s.content__link}>
              Contact
            </a>
          </li>
        </ul>
        <div className={s.logo}>
          <a href="/" className={s.link}>
            MOVIE
          </a>
        </div>
        <div>
          <ul>
            <Link>
              <li>Social</li>
            </Link>
          </ul>
        </div>
      </div>

      <p className={s.copirynght}>
        Copyright © 2021 MOVIE. All Rights Reserved.
      </p>
    </footer>
  );
}
export default Footer;
