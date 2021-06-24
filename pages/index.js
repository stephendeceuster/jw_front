import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Splash.module.scss";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Jorne Wellens | fotografie & houtbewerking</title>
        <meta
          name="description"
          content="Dit de beschrijving van de homepagina"
        />
        <link rel="canonical" href="https://jw-front.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div className={styles.splash_wrapper}>
        <div className={styles.photo_splash}>
          <Link href="/photo">
            <a>
              <h2>Fotografie</h2>
            </a>
          </Link>
        </div>
        <div className={styles.wood_splash}>
          <Link href="/wood">
            <a>
              <h2>Houtbewerking</h2>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
