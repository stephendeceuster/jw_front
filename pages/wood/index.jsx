import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Content.module.scss";


export const getServerSideProps = async () => {
  const resp = await axios.get(
    "https://wdev2.be/stephen21/eindwerk/api/wood_categories.json"
  );

  const allCategories = resp.data;
  const categories = allCategories.filter((cat) => cat.published);
  return {
    props: {
      categories,
    },
  };
};

const WoodIndex = ( props ) => {
  const { categories, setLastWoodPage } = props;
  const router = useRouter();
  setLastWoodPage(router.asPath);
  return (
    <div className={styles.content}>
      <h1 className={styles.overview_heading}>Houtbewerking</h1>
      <p className={styles.intro}>
        “Simplicity carried to an extreme becomes elegance.”
        <br />– Unkwown
      </p>

      {categories
        .sort((a, b) => a.sorting - b.sorting)
        .map((cat) => (
          <div className={styles.content_box} key={cat.slug}>
            <Link href={`/wood/category/${cat.slug}`} passHref>
              <a>
                <div className={styles.image_wrap}>
                  <Image
                    layout="fill"
                    src={`https://wdev2.be/stephen21/eindwerk/uploads/${cat.thumbnail}`}
                  />
                </div>
              </a>
            </Link>
            <Link href={`/wood/category/${cat.slug}`} passHref>
              <a>
                <h3>{cat.title}</h3>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default WoodIndex;