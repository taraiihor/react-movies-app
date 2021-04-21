import s from './CardFilm.module.css';
import photo from '../../image/creed.jpg';

function CardFilm() {
  return (
    <li className={s.bg}>
      <div className={s.poser}>
        <img src={photo} alt="" className={s.cover} />
      </div>
      <div className={s.containerText}>
        <h2 className={s.title}>AssAssin’s Creed</h2>
        <p className={s.rating__number}>4.2</p>
        <p className={s.genres}>Action, Adventure, Fantasy</p>
      </div>
    </li>
  );
}

export default CardFilm;
