import s from './HomeView.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CardFilm from '../../components/CardFilm';
import * as moviesApi from '../../service/api';
import { Pagination } from '@material-ui/lab';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  const onPaginationPage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  useEffect(() => {
    moviesApi.fetchPopularMovies(page).then(({ results, total_pages }) => {
      setMovies(results);
      setTotalPage(total_pages);
    });
  }, [page]);

  return (
    <>
      <div>
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
        {totalPage > 1 && (
          <Pagination
            className={s.pagination}
            count={totalPage}
            onChange={onPaginationPage}
            page={Number(page)}
          />
        )}
      </div>
    </>
  );
}
