import Head from "next/head";
import styles from "../../styles/pages/posts.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2022</time>

            <strong>Titulo</strong>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              assumenda modi ipsa aperiam dolorem! Dolor repellendus ex placeat
              fugiat unde eos doloribus laudantium perspiciatis, eaque
              voluptates facere animi enim aut.
            </p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time>

            <strong>Titulo</strong>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              assumenda modi ipsa aperiam dolorem! Dolor repellendus ex placeat
              fugiat unde eos doloribus laudantium perspiciatis, eaque
              voluptates facere animi enim aut.
            </p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time>

            <strong>Titulo</strong>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              assumenda modi ipsa aperiam dolorem! Dolor repellendus ex placeat
              fugiat unde eos doloribus laudantium perspiciatis, eaque
              voluptates facere animi enim aut.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
