import { subscribeText } from "./locales";
import styles from "./styles.module.scss";

const SubscribeButton = () => {
  return (
    <button type="button" className={styles.subscribeButton}>
      {subscribeText}
    </button>
  );
};

export default SubscribeButton;
