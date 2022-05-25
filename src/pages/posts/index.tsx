import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prisimic";
import { RichText } from "prismic-dom";
import Head from "next/head";
import styles from "../../styles/pages/posts.module.scss";
import Prismic from "@prismicio/client";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              href={
                session?.activeSubscription
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
              key={post.slug}
            >
              <a>
                <time>{post.updatedAt}</time>

                <strong>{post.title}</strong>

                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<any>(
    [Prismic.predicates.at("document.type", "post-type")],
    {
      fetch: ["title", "content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.Title),
      excerpt:
        post.data.Content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });
  return {
    props: { posts },
  };
};
