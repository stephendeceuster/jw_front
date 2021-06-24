import Head from "next/head";
import { ContactForm } from "../components/ContactForm";
import styles from "../styles/Content.module.scss";

const Contact = (props) => {
  return (
    <>
      <Head>
        <title>Contact | Jorne Wellens | fotografie & houtbewerking</title>
        <meta
          name="description"
          content="Dit de beschrijving van de contactpagina"
        />
        <link rel="canonical" href="https://jw-front.vercel.app/contact" />
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
        <h1>Contact</h1>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
