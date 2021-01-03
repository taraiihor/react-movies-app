import { useState, useEffect } from 'react';
import { useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom';
import * as moviesApi from '../service/api';

export default function MoviesSerchView() {
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const location = useLocation();
  const searchMovie = new URLSearchParams(location.search).get('query') ?? '';

  const handleNameChangle = event => {
    setSearchQuery(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    history.push({ ...location, search: `query=${searchQuery}` });
    setSearchQuery('');
  };
  useEffect(() => {
    if (searchMovie === '') {
      return;
    }
    moviesApi
      .fetchSearchMovies(searchMovie)
      .then(({ results }) => setMovie(results));
  }, [searchMovie]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={searchQuery} onChange={handleNameChangle} />
        <button type="submit">Пошук</button>
      </form>
      {movie && (
        <ul>
          {movie.map(({ title, id }) => (
            <li key={id}>
              <Link to={`${url}/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
