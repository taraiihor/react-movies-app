import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesApi from '../service/api';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    moviesApi.fetchTrendingMovies().then(({ results }) => setMovies(results));
  }, []);

  return (
    <>
      <h2>Тренди сьогоднішього дня</h2>
      <ul>
        {movies &&
          movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{ pathname: `/movies/${id}`, state: { from: location } }}
              >
                {title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
