import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../../styles/Content.module.scss";

export const getStaticProps = async () => {
  const resp = await axios.get(
    "https://wdev2.be/stephen21/eindwerk/api/photo_categories.json"
  );

  const allCategories = resp.data;
  const categories = allCategories.filter((cat) => cat.published);
  return {
    props: {
      categories,
    },
    revalidate: 3600,
  };
};

const PhotoIndex = (props) => {
  const { categories, setLastPhotoPage } = props;
  const router = useRouter();
  useEffect(() => {
    setLastPhotoPage(router.asPath);
  }, []);

  return (
    <>
      <Head>
        <title>Jorne Wellens | fotografie</title>
        <meta
          name="description"
          content="Dit is de beschrijving van de hoofdpagina van fotografie"
        />
        <link
          rel="canonical"
          href={`https://jw-front.vercel.app/${router.asPath}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000000"></meta>
      </Head>
      <div className={styles.content}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.overview_heading}
        >
          Fotografie
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={styles.intro}
        >
          “A good snapshot keeps a moment that's gone from running away.”
          <br />– Eudora Welty
        </motion.p>

        {categories
          .sort((a, b) => a.sorting - b.sorting)
          .map((cat) => (
            <div className={styles.content_box} key={cat.slug}>
              <Link href={`/photo/category/${cat.slug}`} passHref>
                <a>
                  <motion.figure
                    className={styles.image_wrap}
                    layoutId={cat.slug}
                  >
                    <Image
                      layout="fill"
                      alt={`${cat.title} | Jorne Wellens`}
                      src={`https://wdev2.be/stephen21/eindwerk/uploads/${cat.thumbnail}`}
                    />
                  </motion.figure>
                </a>
              </Link>
              <Link href={`/photo/category/${cat.slug}`} passHref>
                <a>
                  <h3>
                    <span>{cat.title}</span>
                  </h3>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default PhotoIndex;
