// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link, NavLink } from 'react-router-dom';
// import Container from '../Container';
import s from './Heder.module.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  // const [searchQuery, setSearchQuery] = useState('');

  // const hendleNameChange = event => {
  //   setSearchQuery(event.target.value);
  // };
  // const handleSubmit = evetn => {
  //   evetn.preventDefault();
  //   setSearchQuery('');
  // };
  return (
    <header className={s.header}>
      <Link to="/" className={s.logo}>
        MOVIE
      </Link>

      <Navigation />
      {/* <form onSubmit={handleSubmit}>
            <input
              // type="text"
              value={searchQuery}
              onChange={hendleNameChange}
            />
          </form> */}
      {/* <nav>
          <NavLink className={s.navigation} to="/favorite">
            Favorite
          </NavLink>
          <NavLink to="/review">Review</NavLink>
        </nav> */}
    </header>
  );
}

export default Header;
