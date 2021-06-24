import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="/photo" passHref>
          <img className={styles.logo} src="/logo/JorneWellens-geel.svg" />
        </Link>
      </div>
      <div>
        <ul>
          <li>Jorne Wellens</li>
          <li>
            <a href="mailto:jornewellens@gmail.com">jornewellens@gmail.com</a>
          </li>
          <li><a href="tel:+32 473 78 29 05">+32 473 78 29 05</a></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><Link href="/photo" ><a>contact</a></Link></li>
          <li><Link href="/algemene-voorwaarden" ><a>algemene voorwaarden</a></Link></li>
          <li><Link href="/privacy" ><a>privacy policy</a></Link></li>
        </ul>
      </div>
    </footer>
  );
};
