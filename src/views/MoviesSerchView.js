import { useState, useEffect } from 'react';
import { useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom';
import * as moviesApi from '../service/api';
import ErrorView from './ErrorView';

export default function MoviesSerchView() {
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const history = useHistory();
  // console.log(history);
  const location = useLocation();
  // console.log(location);
  const searchMovie = new URLSearchParams(location.search).get('query') ?? '';

  // console.log(searchMovie);
  const updatePage = () => {
    setPage(page + 1);
  };
  const handleNameChangle = event => {
    setSearchQuery(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    setSearchQuery('');
    setMovie(null);
    setError(null);
  };
  useEffect(() => {
    if (searchMovie === '') {
      return;
    }
    moviesApi
      .fetchSearchMovies(searchMovie, page)
      .then(({ results }) => {
        if (results.length === 0) {
          return Promise.reject(
            new Error(`По вашому пошуку нічого не знайшли`),
          );
        }
        setMovie(results);
      })
      .catch(error => {
        setError(error);
      });
  }, [searchMovie, page]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={searchQuery} onChange={handleNameChangle} />
        <button type="submit">Пошук</button>
      </form>
      {error && <ErrorView message={error.message} />}

      {movie && (
        <ul>
          {movie.map(({ title, id }) => (
            <li key={id}>
              <Link
                to={{ pathname: `${url}/${id}`, state: { from: location } }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {movie && (
        <button type="button" onClick={updatePage}>
          наступні фільми
        </button>
      )}
    </>
  );
}
