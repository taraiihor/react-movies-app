import s from './Hero.module.css';
import { useEffect, useState } from 'react';
import * as moviesApi from '../../service/api';
import SlideSwiper from '../Swiper/Swiper';
import ErrorView from '../../views/ErrorView';
import Loader from 'react-loader-spinner';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
function Hero() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    moviesApi
      .insertGenresToMovieObj()
      .then(results => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);
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
      <section className={s.bg}>
        {status === Status.RESOLVED && <SlideSwiper movies={movies} />}{' '}
      </section>
    </>
  );
}

export default Hero;
