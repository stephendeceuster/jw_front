import Link from "next/link";
import styles from "../styles/Header.module.scss";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src="/logo/JorneWellens-zwart.svg" />
        <nav>
          <ul>
            <li>
              <Link href="/about">
                <a>about</a>
              </Link>
            </li>
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
