import s from './Hero.module.css';
import AppendDots from '../Slider';

function Hero() {
  return (
    <section className={s.bg}>
      <AppendDots />
    </section>
  );
}

export default Hero;
