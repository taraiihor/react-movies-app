import s from './Hero.module.css';
import bg from '../../image/junglebook.jpg';

function Hero() {
  return (
    <>
      <section className={s.bg}>
        <img src={bg} alt="" />

        <div className={s.description}>
          <h2 className={s.title}>The Jungle Book</h2>
          <p className={s.genres}>Adventure Drama Family Fantasy | 1h 46m</p>
          <div className={s.rating}>
            <span>insignia</span>
            <p className={s.rating__number}>4.8</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
