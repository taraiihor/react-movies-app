import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import {  useRouteMatch, Link } from 'react-router-dom';
import s from './MoviesSerchView.module.css';

import * as moviesApi from '../../service/api';
import ErrorView from '../ErrorView';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { Pagination } from '@material-ui/lab';
import useStyles from '../../service/PaginationStyles';
import CardFilm from '../../components/CardFilm';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesSerchView() {
  // const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
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
    if (searchQuery.trim() === '') {
      return toast.warning('Ви нічого не вели');
    }
    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    setSearchQuery('');

    setStatus(Status.IDLE);
  };

  useEffect(() => {
    if (searchMovie === '') {
      return;
    }
    setStatus(Status.PENDING);

    moviesApi
      .fetchSearchMovies(searchMovie, page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          return Promise.reject(
            new Error(`По вашому пошуку нічого не знайшли`),
          );
        }
        console.log(results);
        setMovie(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchMovie, page]);
  console.log(totalPage);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={searchQuery} onChange={handleNameChangle} />
        <button type="submit">Пошук</button>
      </form>

      {status === Status.IDLE && <div>Ведіть назву Фільму </div>}
      {status === Status.REJECTED && <ErrorView message={error.message} />}
      {status === Status.PENDING && (
        <Loader
          className="Loding"
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000} //3 secs
        />
      )}

      {status === Status.RESOLVED && (
        <ul className={s.content}>
          {movie.map(({ id, title, poster_path, vote_average, genres }) => (
            // <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
            <CardFilm
              id={id}
              key={id}
              title={title}
              poster_path={poster_path}
              vote_average={vote_average}
              genres={genres}
            />
            // </Link>
          ))}
        </ul>
      )}
      {status === Status.RESOLVED && totalPage > 1 && (
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
