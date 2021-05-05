import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={style.link}
      activeClassName={style.activeLink}
    >
      Home movies
    </NavLink>
    <NavLink
      to="/movies"
      className={style.link}
      activeClassName={style.activeLink}
    >
      Movies
    </NavLink>
    <NavLink
      to="/fal"
      className={style.link}
      activeClassName={style.activeLink}
    >
      Fal
    </NavLink>
  </nav>
);

export default Navigation;
