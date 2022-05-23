import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signInText } from "./locales";
import styles from "./styles.module.scss";

const SignInButton = () => {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      username
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      {signInText}
    </button>
  );
};

export default SignInButton;
