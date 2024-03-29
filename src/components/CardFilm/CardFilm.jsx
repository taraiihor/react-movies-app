import s from './CardFilm.module.css';
import noImage from '../../image/488px-No-Image-Placeholder.svg.png';

import { Link, useLocation } from 'react-router-dom';

function CardFilm({ id, title, poster_path, vote_average, genres, overview }) {
  const location = useLocation();

  return (
    <Link to={{ pathname: `/movies/${id}`, state: { from: location } }}>
      <li className={s.bg} key={id}>
        <div className={s.poser}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : noImage
            }
            alt=""
            className={s.cover}
          />
        </div>
        <div className={s.containerText}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.rating__number}>{`${vote_average}`}</p>
          {/* <p className={s.genres}>
            {genres.map(genre => genre.name).join(', ')}
          </p> */}
        </div>
        <div className={s.hide}>
          {/* <Link href="/">+ Favorites</Link> */}
          {/* <button className={s.hide__link} onClick={() => addFavorites()}>
            + Favorites
          </button> */}
          <div className={s.hide__content}>
            <h2 className={s.hide__title}>{title}</h2>
            <p className={s.hide__rating__number}>{`${vote_average}`}</p>
          </div>

          <p className={s.hide__text}>{overview}</p>
          {/* <button className={s.hide__button}>Watch Now</button> */}
        </div>
      </li>
    </Link>
  );
}

export default CardFilm;
