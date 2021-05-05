import CardFilm from '../../components/CardFilm';
import s from './Fal.module.css';
function Fal({ items }) {
  return (
    <>
      <h2>Тут картки</h2>
      <ul className={s.content}>
        {items &&
          items.map(
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

export default Fal;
