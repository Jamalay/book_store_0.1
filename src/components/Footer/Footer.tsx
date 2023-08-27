import styles from "./Footer.module.css";
import { YouTube_svg } from "./YouTube_svg";
import { Telegram_svg } from "./Telegram_svg";
import { WK_svg } from "./WK_svg";
import { TikTok_svg } from "./TikTok_svg";
import { Classmates_svg } from "./Classmates_svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.information_title}>
          <div className={styles.title}>
            Книжный интернет-магазин «Читай-деревня»
          </div>
          <p className={styles.text}>
            «Читай-деревня» – сеть книжных магазинов, успешно работающих в
            Москве и других регионах России.
          </p>
          <p className={styles.text}>
            А ещё это – крупный интернет-магазин книг. В нём вы можете
            заказывать книги в любое время 24 часа в сутки.
          </p>
        </div>
        <div>
          <div className={styles.title}>В наших магазинах</div>
          <p className={styles.link}>Адреса магазинов</p>{" "}
          {/* сделмать переход на страницу с картой */}
          <p className={styles.link}>Услуги</p>
          <p className={styles.link}>Наши партнёры</p>
          <p className={styles.link}>О компании</p>
        </div>
        <div>
          <div className={styles.title}>В интернет-магазине</div>
          <p className={styles.link}>Доставка и оплата</p>
          <p className={styles.link}>Вопросы и ответы</p>
          <p className={styles.link}>Акции</p>
        </div>
      </div>
      <hr />
      <div className={styles.icons}>
        <WK_svg />
        <Classmates_svg />
        <YouTube_svg />
        <TikTok_svg />
        <Telegram_svg />
      </div>
    </footer>
  );
};

export { Footer };
