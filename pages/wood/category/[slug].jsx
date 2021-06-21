import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BackButton } from "../../../components/BackButton";
import styles from "../../../styles/Content.module.scss";

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/wood_categories.json?slug=${slug}`
  );
  const [category] = resp.data;
  // TODO : if not category or not published, return 404

  return {
    props: {
      category,
    },
  };
};

const WoodCategoryView = (props) => {
  const { category, setLastWoodPage } = props;

  const router = useRouter();
  setLastWoodPage(router.asPath);
  // TODO : filter on serverside
  const cases = category.woodCasesCategories.filter((c) => c.published) || [];
 

  return (
    <>
      <motion.figure className={styles.hero} layoutId={category.slug}>
        <Image
          layout="fill"
          src={`https://wdev2.be/stephen21/eindwerk/uploads/${category.thumbnail}`}
        />
      </motion.figure>
      <BackButton />
      <div className={styles.content}>
        <h1>{category.title}</h1>
        {/* {category.description && <div className={styles.description} dangerouslySetInnerHTML={{ __html:category.description }}></div>} */}
        {category.description && (
          <div className={styles.description}>{category.description}</div>
        )}
        {cases.length > 0 &&
          cases.map((c) => (
            <div key={c.slug} className={styles.content_box}>
              <Link href={`/wood/case/${c.slug}`} passHref>
                <a>
                  <motion.figure className={styles.image_wrap} layoutId={c.slug}>
                    <Image
                      layout="fill"
                      src={`https://wdev2.be/stephen21/eindwerk/uploads/${c.thumbnail}`}
                    />
                  </motion.figure>
                </a>
              </Link>{" "}
              <Link href={`/wood/case/${c.slug}`} passHref>
                <a>
                  <h3>{c.title}</h3>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default WoodCategoryView;
