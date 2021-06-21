import { useEffect } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';


const Home = (props) => {
  console.log(props);
  return (
  <><Link href="/photo"><a>Fotografie</a></Link><br/><Link href="/wood"><a>Houtbewerking</a></Link></>);
};

export default Home;
