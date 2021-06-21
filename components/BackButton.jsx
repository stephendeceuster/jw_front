import { useRouter } from "next/router";
import styles from "../styles/BackButton.module.scss";

export const BackButton = () => {
    const router = useRouter();
    if (router.pathname === "/") {
        return null;
    }
    return (
        <div className={styles.back_button_div}>
            <p onClick={()=>router.back()}>Ga terug →</p>
        </div>
    )
}