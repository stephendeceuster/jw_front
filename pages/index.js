import Link from "next/link";
import styles from "../styles/Splash.module.scss";

const Home = (props) => {
  return (
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
          <a><h2>Houtbewerking</h2></a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
