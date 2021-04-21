import s from './CardFilm.module.css';

function CardFilm() {
  return (
    <li className={s.bg}>
      <div className={s.poser}></div>
      <div className={s.containerText}>
        <h2 className={s.title}>AssAssin’s Creed</h2>
        <p className={s.rating__number}>4.2</p>
        <p className={s.genres}>Action, Adventure, Fantasy</p>
      </div>
    </li>
  );
}

export default CardFilm;
