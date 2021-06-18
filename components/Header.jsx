import Link from "next/link";
import styles from "../styles/Header.module.scss";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href='/photo' passHref>
        <img className={styles.logo} src="/logo/JorneWellens-zwart.svg" />
        </Link>
        <nav>
          <ul>
            {/* <li>
              <Link href="/about">
                <a>about</a>
              </Link>
            </li> */}
            <li>
              <Link href="/contact">
                <a>contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
