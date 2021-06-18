import Link from "next/link";
import styles from "../styles/Footer.module.scss";

export const Footer = () => {
  return <footer className={styles.footer}>
      <div>
      <Link href='/photo' passHref>
        <img className={styles.logo} src="/logo/JorneWellens-geel.svg" />
        </Link>
      </div>
      <div>
          <ul>
              <li>
                  Jorne Wellens
              </li>
              <li>
                  jornewellens@gmail.com
              </li>
              <li>
                  +32 473 78 29 05
              </li>
          </ul>
      </div>
      <div>
          <ul>
              <li>
                  Contact
              </li>
              <li>
                  Algemene Voorwaarden
              </li>
              <li>
                  Privacy policy
              </li>
          </ul>
      </div>
  </footer>;
};
