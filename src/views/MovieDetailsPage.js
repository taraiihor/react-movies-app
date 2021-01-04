import { useEffect, useState, lazy, Suspense } from 'react';
import { Route, useParams, useRouteMatch, NavLink } from 'react-router-dom';
import * as moviesApi from '../service/api';
// import Cast from './Cast';
// import Reviews from './Reviews';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);

export default function MoviedetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi.fetchMoviesId(movieId).then(setMovies);
  }, [movieId]);
  return (
    <>
      {movies && (
        <>
          <p>{`${movies.title}`}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            alt={movies.title}
            width="200px"
          />
          <p>{`${movies.overview}`}</p>
          <p>{`${movies.release_date}`}</p>
          <p>{`${movies.vote_average}`}</p>
          <p>{`${movies.genres.map(genre => genre.name).join(', ')}`}</p>
          <hr />
          <p>Додаткова інформація</p>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
        </>
      )}
      <Suspense fallback={<div>Грузимо...</div>}>
        <Route path={`${path}/cast`}>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
