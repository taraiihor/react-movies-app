import s from './CardFilm.module.css';
import noImage from '../../image/488px-No-Image-Placeholder.svg.png';

import { Link, useLocation } from 'react-router-dom';

function CardFilmCopy({ id, title, poster_path, vote_average, genres }) {
  const location = useLocation();

  return (
    <Link to={{ pathname: `/movies/${id}`, state: { from: location } }}>
      <li className={s.bg}>
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
          <p className={s.genres}>{genres.map(genre => genre).join(', ')}</p>
        </div>
      </li>
    </Link>
  );
}

export default CardFilmCopy;
