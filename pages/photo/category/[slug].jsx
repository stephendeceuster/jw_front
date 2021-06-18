import axios from "axios";
import Link from "next/link";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import styles from "../../../styles/Content.module.scss";

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_categories.json?slug=${slug}`
  );
  const [category] = resp.data;
  // TODO : if not category or not published, return 404

  return {
    props: {
      category,
    },
  };
};

const CategoryView = ({ category }) => {
  const cases = category.photoCases.filter((c) => c.published);

  return (
    <>
      <Header />
      <img
        className={styles.hero}
        src={`https://wdev2.be/stephen21/eindwerk/uploads/${category.thumbnail}`}
      />
      <div className={styles.content}>
        <h1>{category.title}</h1>
        {category.description && <div className={styles.description} dangerouslySetInnerHTML={{ __html:category.description }}></div>}
        {cases.length > 0 &&
          cases.map((c) => (
            <Link key={c.slug} href={`/photo/case/${c.slug}`} passHref>
              <div className={styles.content_box}>
                <img
                  src={`https://wdev2.be/stephen21/eindwerk/uploads/${c.thumbnail}`}
                />
                <h3>{c.title}</h3>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default CategoryView;
