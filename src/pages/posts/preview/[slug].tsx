import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { getPrismicClient } from "../../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";
import styles from "../../../styles/pages/post.module.scss";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getStripeJs } from "../../../services/stripe-js";
import { api } from "../../../services/axios";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PostPreview = ({ post }: PostPreviewProps) => {
  const { slug, title, content, updatedAt } = post;

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${slug}`);
    }
  }, [router, session, slug]);

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
    <>
      <Head>
        <title>{title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          <div className={styles.continueReading}>
            Wanna continue reading?
            <a onClick={handleSubscribe}>Subscribe now 🤗</a>
          </div>
        </article>
      </main>
    </>
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID<any>("post-type", String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
