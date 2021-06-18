import { useState } from "react";
import { Header } from "../components/Header";
import { ContactForm } from "../components/ContactForm";
import styles from "../styles/Content.module.scss";
import { Footer } from "../components/Footer";

const Contact = (props) => {
  return (
    <>
      <Header />
      <div className={styles.content}>
      <h1>Contact</h1>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
