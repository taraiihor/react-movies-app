import s from './Hero.module.css';

function Hero() {
  return (
    <>
      <section className={s.bg}>
        <h1>Title</h1>
        <p>Genre | time film</p>
        <div>
          <span>insignia</span>
          <p>4.8</p>
        </div>
      </section>
    </>
  );
}

export default Hero;
