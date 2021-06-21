import { useState, useEffect } from 'react';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const [test, setTest] = useState(true);
  useEffect(() => {
    console.log(Date.now());
    return () => {
      console.log('1');
    }
  }, [test])
  return <Component {...pageProps} />
}


export default MyApp
