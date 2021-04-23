import s from './HomeView.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CardFilm from '../../components/CardFilm';
import * as moviesApi from '../../service/api';
import { Pagination } from '@material-ui/lab';
import useStyles from '../../service/PaginationStyles';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const classes = useStyles();
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
  console.log(totalPage);
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
