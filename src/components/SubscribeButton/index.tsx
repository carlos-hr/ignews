import { subscribeText } from "./locales";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      {subscribeText}
    </button>
  );
};

export default SubscribeButton;
