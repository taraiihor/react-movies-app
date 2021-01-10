import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesApi from '../service/api';
import noImage from '../image/488px-No-Image-Placeholder.svg.png';
import Loader from 'react-loader-spinner';

// import Cast from './Cast';
// import Reviews from './Reviews';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);

export default function MoviedetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi.fetchMoviesId(movieId).then(setMovies);
  }, [movieId]);
  const onGoBack = () => {
    // if (location && location.state && location.state.from) {
    //   history.push(location.state.from);
    //   return;
    // }
    // history.push('/');

    // новий вид запису перевірки
    history.push(location?.state?.from ?? '/');
  };
  return (
    <>
      {movies && (
        <>
          <div className="movie__container">
            <div>
              <button type="button" onClick={onGoBack}>
                Назад
              </button>
              <img
                src={
                  movies.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                    : noImage
                }
                alt={movies.title}
                width="220px"
              />
            </div>
            <div className="text__container">
              <p className="text__container-title">{`${movies.title}`}</p>
              <p>{`${movies.vote_average}`}</p>

              <p>
                <span className="text__container-title">Overview: </span>
                {`${movies.overview}`}
              </p>
              <p>
                <span className="text__container-title">Data: </span>
                {`${movies.release_date}`}
              </p>

              <p>
                <span className="text__container-title">Genres: </span>
                {`${movies.genres.map(genre => genre.name).join(', ')}`}
              </p>
            </div>
          </div>

          <hr />
          <p className="text__container-title">Додаткова інформація</p>
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
      <Suspense
        fallback={
          <div>
            <Loader
              className="BallTriangle"
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={5000} //3 secs
            />
          </div>
        }
      >
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
