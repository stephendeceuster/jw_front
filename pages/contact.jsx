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
      </Head>
      <div className={styles.content}>
        <h1>Contact</h1>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
