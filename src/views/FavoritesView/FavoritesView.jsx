import CardFilm from '../../components/CardFilm';
import s from './FavoritesView.module.css';

function FavoritesView({ movies }) {
  return (
    <>
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
    </>
  );
}

export default FavoritesView;
