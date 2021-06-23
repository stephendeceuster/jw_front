import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BackButton } from "../../../components/BackButton";
import styles from "../../../styles/Content.module.scss";

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_cases.json?slug=${slug}`
  );
  const [cas] = resp.data;

  if (!cas || !cas.published) {
    return {
      notFound: true,
    };
  }

  const images = [
    cas.contentImg1 || null,
    cas.contentImg2 || null,
    cas.contentImg3 || null,
    cas.contentImg4 || null,
    cas.contentImg5 || null,
    cas.contentImg6 || null,
  ].filter((img) => img !== null);

  // TODO : if not case or not published, return 404
  return {
    props: {
      cas,
      images,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_cases.json`
  );
  console.log('resp', resp)
  const cases = resp.data.filter((cas) => cas.published);
  const paths = cases.map((cas) => ({
    params: { slug: cas.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const PhotoCaseView = (props) => {
  const { cas, images, setLastPhotoPage } = props;
  const router = useRouter();
  setLastPhotoPage(router.asPath);
  return (
    <>
      <motion.figure className={styles.hero} layoutId={cas.slug}>
        <Image
          layout="fill"
          src={`https://wdev2.be/stephen21/eindwerk/uploads/${cas.thumbnail}`}
        />
      </motion.figure>
      <BackButton />
      <div className={styles.content}>
        <h1>{cas.title}</h1>
        {cas.description && (
          <div className={styles.description}>{cas.description}</div>
        )}
        {images.length > 0 &&
          images
            .sort((a, b) => 0.5 - Math.random())
            .map((img) => (
              <div key={img} className={styles.content_box}>
                <img
                  layout="fill"
                  src={`https://wdev2.be/stephen21/eindwerk/uploads/${img}`}
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default PhotoCaseView;
