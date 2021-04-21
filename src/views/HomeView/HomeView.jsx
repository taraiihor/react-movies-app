import s from './HomeView.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardFilmCopy from '../../components/CardFilm/CardFilmCopy';
import * as moviesApi from '../../service/api';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    moviesApi.fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);
  console.log(movies);
  return (
    <>
      <h2>Тренди сьогоднішього дня</h2>
      <ul className={s.content}>
        {movies &&
          movies.map(({ id, title, poster_path, vote_average, genre_ids }) => (
            <CardFilmCopy
              id={id}
              title={title}
              poster_path={poster_path}
              vote_average={vote_average}
              genres={genre_ids}
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
