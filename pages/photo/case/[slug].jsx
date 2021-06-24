import { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BackButton } from "../../../components/BackButton";
import styles from "../../../styles/Content.module.scss";

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_cases.json?slug=${slug}`
  );
  const [cas] = resp.data;

  if (!cas || !cas.published) {
    return {
      notFound: true,
    };
  }

  const images = [
    cas.contentImg1 || null,
    cas.contentImg2 || null,
    cas.contentImg3 || null,
    cas.contentImg4 || null,
    cas.contentImg5 || null,
    cas.contentImg6 || null,
  ].filter((img) => img !== null);

  return {
    props: {
      cas,
      images,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths = async () => {
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_cases.json`
  );
  const cases = resp.data.filter((cas) => cas.published);
  const paths = cases.map((cas) => ({
    params: { slug: cas.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const PhotoCaseView = (props) => {
  const { cas, images, setLastPhotoPage } = props;
  const router = useRouter();
  useEffect(() => {
    setLastPhotoPage(router.asPath);
  }, []);
  return (
    <>
      <Head>
        <title>{cas.title} Jorne Wellens | fotografie</title>
        <meta name="description" content={cas.description} />
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
      <motion.figure className={styles.hero} layoutId={cas.slug}>
        <Image
          layout="fill"
          alt={`${cas.title} | Jorne Wellens`}
          src={`https://wdev2.be/stephen21/eindwerk/uploads/${cas.thumbnail}`}
        />
      </motion.figure>
      <BackButton />
      <div className={styles.content}>
        <h1>{cas.title}</h1>
        {cas.description && (
          <div className={styles.description}>{cas.description}</div>
        )}
        {images.length > 0 &&
          images
            .sort((a, b) => 0.5 - Math.random())
            .map((img) => (
              <div key={img} className={styles.content_box}>
                <img
                  layout="fill"
                  alt={`${cas.title} | Jorne Wellens`}
                  src={`https://wdev2.be/stephen21/eindwerk/uploads/${img}`}
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default PhotoCaseView;
