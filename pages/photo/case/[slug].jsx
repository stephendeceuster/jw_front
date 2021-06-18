import axios from "axios";
import { Header } from "../../../components/Header";
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
    cas.contentImg2 || null,
    cas.contentImg4 || null,
    cas.contentImg5 || null,
    cas.contentImg6 || null,
  ]
    .filter((img) => img !== null)
    .sort((a, b) => 0.5 - Math.random());
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
  const description = () => {
    __html: cas.description;
  };
  return (
    <>
      <Header />
      <img
        className={styles.hero}
        src={`https://wdev2.be/stephen21/eindwerk/uploads/${cas.thumbnail}`}
      />
      <div className={styles.content}>
        <h1>{cas.title}</h1>
        {cas.description && (
          <div dangerouslySetInnerHTML={description()}></div>
        )}
        {images.length > 0 &&
          images.map((img) => (
            <div className={styles.content_box}>
              <img src={`https://wdev2.be/stephen21/eindwerk/uploads/${img}`} />
            </div>
          ))}
      </div>
    </>
  );
};

export default CaseView;
