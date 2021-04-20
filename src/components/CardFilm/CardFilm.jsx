import s from './CardFilm.module.css';

function CardFilm() {
  return (
    <div className={s.bg}>
      <div className={s.poser}></div>
      <div className={s.containerText}>
        <h2> Assasin</h2>
        <p>4.2</p>
        <p>Geners</p>
      </div>
    </div>
  );
}

export default CardFilm;
