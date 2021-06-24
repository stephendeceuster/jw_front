import { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BackButton } from "../../../components/BackButton";
import styles from "../../../styles/Content.module.scss";

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/wood_categories.json?slug=${slug}`
  );
  const [category] = resp.data;

  if (!category || !category.published) {
    return {
      notFound: true,
    };
  }

  const cases = category.woodCasesCategories.filter((c) => c.published) || [];

  return {
    props: {
      category,
      cases,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths = async () => {
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/wood_categories.json`
  );
  const categories = resp.data.filter((cat) => cat.published);
  const paths = categories.map((cat) => ({
    params: { slug: cat.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const WoodCategoryView = (props) => {
  const { category, cases, setLastWoodPage } = props;

  const router = useRouter();
  useEffect(() => {
    setLastWoodPage(router.asPath);
  }, []);

  return (
    <>
      <Head>
        <title>{category.title} Jorne Wellens | houtbewerking</title>
        <meta name="description" content={category.description} />
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
      <motion.figure className={styles.hero} layoutId={category.slug}>
        <Image
          layout="fill"
          alt={`${category.title} | Jorne Wellens`}
          src={`https://wdev2.be/stephen21/eindwerk/uploads/${category.thumbnail}`}
        />
      </motion.figure>
      <BackButton />
      <div className={styles.content}>
        <h1>{category.title}</h1>
        {/* {category.description && <div className={styles.description} dangerouslySetInnerHTML={{ __html:category.description }}></div>} */}
        {category.description && (
          <div className={styles.description}>{category.description}</div>
        )}
        {!!cases.length &&
          cases.map((c) => (
            <div key={c.slug} className={styles.content_box}>
              <Link href={`/wood/case/${c.slug}`} passHref>
                <a>
                  <motion.figure
                    className={styles.image_wrap}
                    layoutId={c.slug}
                  >
                    <Image
                      layout="fill"
                      alt={`${c.title} | Jorne Wellens`}
                      src={`https://wdev2.be/stephen21/eindwerk/uploads/${c.thumbnail}`}
                    />
                  </motion.figure>
                </a>
              </Link>{" "}
              <Link href={`/wood/case/${c.slug}`} passHref>
                <a>
                  <h3>{c.title}</h3>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default WoodCategoryView;
