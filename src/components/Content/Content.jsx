import s from './Content.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CardFilm from '../../components/CardFilm';
import * as moviesApi from '../../service/api';
import { Pagination } from '@material-ui/lab';
import ErrorView from '../../views/ErrorView';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
function Content() {
  const [movies, setMovies] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState(Status.IDLE);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  const onPaginationPage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesApi
      .fetchPopularMovies(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);
  return (
    <>
      {status === Status.REJECTED && <ErrorView message={error.message} />}
      {status === Status.PENDING && (
        <Loader
          className={s.Loding}
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000} //3 secs
        />
      )}
      {status === Status.RESOLVED && (
        <ul className={s.content}>
          {movies &&
            movies.map(
              ({ id, title, poster_path, vote_average, genres, overview }) => (
                <CardFilm
                  id={id}
                  key={id}
                  title={title}
                  poster_path={poster_path}
                  vote_average={vote_average}
                  genres={genres}
                  overview={overview}
                />
              ),
            )}
        </ul>
      )}
      {status === Status.RESOLVED && totalPage > 1 && (
        <Pagination
          className={s.pagination}
          count={totalPage}
          onChange={onPaginationPage}
          page={Number(page)}
        />
      )}
    </>
  );
}

export default Content;
