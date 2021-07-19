import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesApi from '../../service/api';
import noImage from '../../image/488px-No-Image-Placeholder.svg.png';
import Loader from 'react-loader-spinner';
import s from './MovieDetailsPage.module.css';

// import Cast from './Cast';
// import Reviews from './Reviews';

const Cast = lazy(() => import('../CastView' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../ReviewsView' /* webpackChunkName: "reviews" */),
);

export default function MoviedetailsPage({ addFavorites, favorites }) {
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

  const favoritesId = favorites
    .map(item => item.id)
    .find(
      (
        element, // eslint-disable-next-line
      ) => element == movieId,
    );
  return (
    <>
      {movies && (
        <>
          <div className={s.movie__container}>
            <div className={s.container__button}>
              <button
                className={s.button_container}
                type="button"
                onClick={onGoBack}
              >
                back
              </button>
              <button
                className={s.button_favorites}
                type="button"
                onClick={() => addFavorites(movies)}
              >
                {favoritesId ? '- Favorites' : '+ Favorites'}
              </button>
              <div className={s.img__container}>
                <img
                  src={
                    movies.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                      : noImage
                  }
                  alt={movies.title}
                  width="100%"
                />
              </div>
            </div>
            <div className={s.text__container}>
              <div className={s.rating__container}>
                <h2 className={s.title__container}>{`${movies.title}`}</h2>
                <p className={s.rating__number}>{`${movies.vote_average}`}</p>
              </div>

              <p className={s.text__text}>
                <span className={s.text__containerTitle}>Overview: </span>
                {`${movies.overview}`}
              </p>
              <p className={s.text__text}>
                <span className={s.text__containerTitle}>Data: </span>
                {`${movies.release_date}`}
              </p>

              <p className={s.text__text}>
                <span className={s.text__containerTitle}>Genres: </span>
                {`${movies.genres.map(genre => genre.name).join(', ')}`}
              </p>
            </div>
          </div>

          <hr />
          <h3 className={s.title__info}>Additional Information</h3>
          <ul className={s.info__list}>
            <li className={s.info__item}>
              <NavLink className={s.info__link} to={`${url}/cast`}>
                Cast
              </NavLink>
            </li>
            <li className={s.info__item}>
              <NavLink className={s.info__link} to={`${url}/reviews`}>
                Reviews
              </NavLink>
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
