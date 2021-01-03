import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../service/api';

export default function HomeView() {
  const [movies, setMovies] = useState(null);

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
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
