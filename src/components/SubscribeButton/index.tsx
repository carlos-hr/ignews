import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/axios";
import { getStripeJs } from "../../services/stripe-js";
import { subscribeText } from "./locales";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const res = await api.post("/subscribe");
      const { sessionId } = res.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {subscribeText}
    </button>
  );
};

export default SubscribeButton;
