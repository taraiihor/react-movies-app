import Slider from 'react-slick';
import noImage from '../../image/junglebook.jpg';
import { useEffect, useState } from 'react';
import * as moviesApi from '../../service/api';
import { Rating } from '@material-ui/lab';

import s from './Slider.module.css';

export default function AppendDots() {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    moviesApi.insertGenresToMovieObj().then(results => {
      setMovies(results);
    });
  }, []);
  console.log(movies);
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,

    appendDots: dots => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          bottom: '80px',
          padding: '10px',
        }}
      >
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            margin: '10px',
          }}
        >
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
  };
  return (
    <div>
      <Slider {...settings}>
        {movies &&
          movies.map(
            ({
              id,
              title,
              backdrop_path,
              vote_average,
              genres,
              release_date,
              popularity,
            }) => (
              <div key={id}>
                <div className={s.bgc}>
                  <img
                    src={
                      backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                        : noImage
                    }
                    alt=""
                    className={s.cover}
                  />
                </div>
                <div className={s.description}>
                  <h2 className={s.title}>{title}</h2>
                  <p className={s.genres}>
                    {genres.map(genre => genre.name).join(', ')} |{' '}
                    {release_date}
                  </p>
                  <div className={s.rating}>
                    <span>
                      <Rating defaultValue={2.5} precision={0.5} readOnly />
                    </span>
                    <p className={s.rating__number}>{`${vote_average}`}</p>
                  </div>
                </div>
              </div>
            ),
          )}
      </Slider>
    </div>
  );
}
