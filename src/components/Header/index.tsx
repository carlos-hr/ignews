/* eslint-disable @next/next/no-img-element */
import ActiveLink from "../ActiveLink";
import { SignInButton } from "../index";
import { homeNavTitle, postsNavTitle } from "./locales";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>{homeNavTitle}</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>{postsNavTitle}</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
