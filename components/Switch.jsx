import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Switch.module.scss";

export const Switch = (props) => {
    const { lastPhotoPage, lastWoodPage } = props;
    const router = useRouter();

    if (router.pathname === "/" ) {
        return null;
    }
    const siteSection = router.pathname.split('/')[1];
    const theOtherSection = siteSection === 'photo' ? 'houtbewerking' : 'fotografie';
    const theOtherPage = siteSection === 'photo' ? lastWoodPage : lastPhotoPage;

    return (
        <div className={styles.switch_div}>
            <Link href={theOtherPage} >
            <a>Ga naar {theOtherSection}  →</a>
            </Link>
        </div>
    )
}