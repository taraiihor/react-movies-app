import { useState, useEffect } from 'react';
import { useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom';
import * as moviesApi from '../service/api';
import ErrorView from './ErrorView';

import { Pagination } from '@material-ui/lab';
import useStyles from '../service/PaginationStyles';

export default function MoviesSerchView() {
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  //Запуск стилів пагінації
  const classes = useStyles();

  const history = useHistory();
  // console.log(history);
  const location = useLocation();
  // console.log(location);
  const searchMovie = new URLSearchParams(location.search).get('query') ?? '';
  const page = new URLSearchParams(location.search).get('page') ?? 1;

  //фунція переключання пагінації і збереження сорінки
  const onPaginationPage = (event, page) => {
    history.push({ ...location, search: `query=${searchMovie}&page=${page}` });
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
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          return Promise.reject(
            new Error(`По вашому пошуку нічого не знайшли`),
          );
        }
        setMovie(results);
        setTotalPage(total_pages);
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

      {totalPage > 1 && (
        <Pagination
          className={classes.root}
          count={totalPage}
          onChange={onPaginationPage}
          page={Number(page)}
        />
      )}
    </>
  );
}
