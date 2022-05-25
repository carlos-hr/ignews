import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getPrismicClient } from "../../services/prisimic";
import { RichText } from "prismic-dom";
import styles from "../../styles/pages/post.module.scss";
import Head from "next/head";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const Post = ({ post }: PostProps) => {
  const { slug, title, content, updatedAt } = post;

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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </article>
      </main>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID<any>("post-type", String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
};
