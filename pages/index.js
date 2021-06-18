import { useEffect } from 'react'
import { useRouter } from "next/router";


const Home = () => {
  const router = useRouter();
  
  useEffect(() => {
    if ( true ) {
      router.push('/photo')
    }
  }, [])
  return <p>redirecting...</p>;
};

export default Home;
