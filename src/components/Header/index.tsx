import { homeNavTitle, postsNavTitle } from "./locales";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />

        <nav>
          <a className={styles.active}>{homeNavTitle}</a>
          <a href="">{postsNavTitle}</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
