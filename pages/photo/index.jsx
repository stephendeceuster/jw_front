import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Header } from "../../components/Header";
import styles from "../../styles/Content.module.scss";

export const getServerSideProps = async () => {
  const resp = await axios.get(
    "https://wdev2.be/stephen21/eindwerk/api/photo_categories.json"
  );

  const categories = resp.data;

  return {
    props: {
      categories,
    },
  };
};

const PhotoIndex = ({ categories }) => {
  console.log("categories", categories);
  return (
    <>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.overview_heading}>Photo</h1>
        <p>
          “A good snapshot keeps a moment that s gone from running away.”
          <br />– Eudora Welty
        </p>
        
        {categories
          .sort((a, b) => a.sorting - b.sorting)
          .map((cat) => (
            <Link key={cat.slug} href={`/photo/category/${cat.slug}`} passHref>
              <div className={styles.content_box}>
                <img
                  layout="fill"
                  src={`https://wdev2.be/stephen21/eindwerk/uploads/${cat.thumbnail}`}
                />
                <h3>{cat.title}</h3>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default PhotoIndex;