import { Swiper, SwiperSlide } from 'swiper/react';
import noImage from '../../image/junglebook.jpg';
import Loader from 'react-loader-spinner';
import Rating from '@material-ui/lab/Rating';
import s from './Swiper.module.css';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from 'swiper/core';

// Import Swiper styles
import '../../index.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

export default function SlideSwiper({ movies }) {
  // console.log(1);
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={swiper => console.log(swiper)}
      >
        {movies && (
            <Loader
              className="BallTriangle"
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={5000} //3 secs
            />
          ) &&
          movies.map(
            ({
              id,
              title,
              backdrop_path,
              vote_average,
              genres,
              release_date,
            }) => (
              <SwiperSlide key={id}>
                <div className={s.bgc}>
                  <img
                    src={
                      backdrop_path
                        ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
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
                      <Rating
                        value={0.5 * vote_average}
                        precision={0.1}
                        readOnly
                      />
                    </span>
                    <p className={s.rating__number}>{`${vote_average}`}</p>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
      </Swiper>
    </>
  );
}
