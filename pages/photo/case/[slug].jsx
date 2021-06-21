import axios from "axios";
import Image from "next/image";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import styles from "../../../styles/Content.module.scss";

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const resp = await axios.get(
    `https://wdev2.be/stephen21/eindwerk/api/photo_cases.json?slug=${slug}`
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

const CaseView = ({ cas, images }) => {
  
  return (
    <>
      <Header />
      <div className={styles.hero}>
      <img
        layout="fill"
        src={`https://wdev2.be/stephen21/eindwerk/uploads/${cas.thumbnail}`}
      />
      </div>
      <div className={styles.content}>
        <h1>{cas.title}</h1>
        {cas.description && <div className={styles.description} dangerouslySetInnerHTML={{ __html:cas.description }}></div>}
        {images.length > 0 &&
          images
            .sort((a, b) => 0.5 - Math.random())
            .map((img) => (
              <div key={img} className={styles.content_box}>
                <Image
                  layout="fill"
                  src={`https://wdev2.be/stephen21/eindwerk/uploads/${img}`}
                />
              </div>
            ))}
      </div>
      <Footer />
    </>
  );
};

export default CaseView;
