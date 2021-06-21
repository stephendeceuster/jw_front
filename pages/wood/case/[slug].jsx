import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Content.module.scss";

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/wood_cases.json?slug=${slug}`
  );
  const [cas] = resp.data;
  const images = [
    cas.contentImg1 || null,
    cas.contentImg2 || null,
    cas.contentImg3 || null,
    cas.contentImg4 || null,
    cas.contentImg5 || null,
    cas.contentImg6 || null,
  ].filter((img) => img !== null);

  console.log(images);
  // TODO : if not case or not published, return 404
  return {
    props: {
      cas,
      images,
    },
  };
};

const WoodCaseView = ( props ) => {
  const { cas, images, setLastWoodPage } = props;
  const router = useRouter();
  setWoodPhotoPage(router.asPath);
  return (
    <>
      <div className={styles.hero}>
        <Image
          layout="fill"
          src={`https://wdev2.be/stephen21/eindwerk/uploads/${cas.thumbnail}`}
        />
      </div>
      <div className={styles.content}>
        <h1>{cas.title}</h1>
        {cas.description && <div className={styles.description}>{cas.description}</div>}
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

export default WoodCaseView;