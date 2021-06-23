import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../../styles/Content.module.scss";

export const getStaticProps = async () => {
  const resp = await axios.get(
    "https://wdev2.be/stephen21/eindwerk/api/photo_categories.json"
  );

  const allCategories = resp.data;
  const categories = allCategories.filter((cat) => cat.published);
  return {
    props: {
      categories,
    },
    revalidate: 10, // 10 seconds TODO : Bump this up.
  };
};

const PhotoIndex = (props) => {
  const { categories, setLastPhotoPage } = props;
  const router = useRouter();
  setLastPhotoPage(router.asPath);
  return (
    <div className={styles.content}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={styles.overview_heading}
      >
        Fotografie
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={styles.intro}
      >
        “A good snapshot keeps a moment that's gone from running away.”
        <br />– Eudora Welty
      </motion.p>

      {categories
        .sort((a, b) => a.sorting - b.sorting)
        .map((cat) => (
          <div className={styles.content_box} key={cat.slug}>
            <Link href={`/photo/category/${cat.slug}`} passHref>
              <a>
                <motion.figure
                  className={styles.image_wrap}
                  layoutId={cat.slug}
                >
                  <Image
                    layout="fill"
                    src={`https://wdev2.be/stephen21/eindwerk/uploads/${cat.thumbnail}`}
                  />
                </motion.figure>
              </a>
            </Link>
            <Link href={`/photo/category/${cat.slug}`} passHref>
              <a>
                <h3>{cat.title}</h3>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PhotoIndex;
