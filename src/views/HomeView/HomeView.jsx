import s from './HomeView.module.css';
import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import CardFilm from '../../components/CardFilm';
import * as moviesApi from '../../service/api';

export default function HomeView() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi.insertGenresToMovieObj().then(results => setMovies(results));
  }, []);
  return (
    <>
      {/* <h2>Тренди сьогоднішього дня</h2> */}
      <ul className={s.content}>
        {movies &&
          movies.map(({ id, title, poster_path, vote_average, genres }) => (
            <CardFilm
              id={id}
              key={id}
              title={title}
              poster_path={poster_path}
              vote_average={vote_average}
              genres={genres}
            />
            // <li key={id}>
            //   <Link
            //     to={{ pathname: `/movies/${id}`, state: { from: location } }}
            //   >
            //     {title}
            //   </Link>
            // </li>
          ))}
      </ul>
    </>
  );
}
