import styles from "./loader.module.scss";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.card}>
                <div className={styles.wrapper}>
                    <div className={styles.spinner}></div>
                </div>
                <h1 className={styles.text}>
                    Loading
                    <div className={styles.dots}></div>
                </h1>
            </div>
        </div>
    );
}
