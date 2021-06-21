import { useState, useEffect } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { BackButton } from "../components/BackButton";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Switch } from "../components/Switch";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [lastWoodPage, setLastWoodPage] = useState("/wood");
  const [lastPhotoPage, setLastPhotoPage] = useState("/photo");

  return (
    <>
      <AnimateSharedLayout>
        <Switch lastPhotoPage={lastPhotoPage} lastWoodPage={lastWoodPage} />
        <Header />
        <Component
          {...pageProps}
          setLastPhotoPage={setLastPhotoPage}
          setLastWoodPage={setLastWoodPage}
        />
        <BackButton />
        <Footer />
      </AnimateSharedLayout>
    </>
  );
}

export default MyApp;
