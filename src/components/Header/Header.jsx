import { Link, NavLink } from 'react-router-dom';
import Container from '../Container';
import s from './Heder.module.css';

function Header() {
  return (
    <div className={s.bg}>
      <Container>
        <header className={s.header}>
          <Link to="/" className={s.logo}>
            MOVIE
          </Link>
          {/* <form action="">
            <input type="text" />
          </form> */}
          <nav>
            <NavLink className={s.navigation} to="/favorite">
              Favorite
            </NavLink>
            {/* <NavLink to="/review">Review</NavLink> */}
          </nav>
        </header>
      </Container>
    </div>
  );
}

export default Header;
