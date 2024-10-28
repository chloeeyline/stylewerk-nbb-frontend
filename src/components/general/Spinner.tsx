import styles from "./spinner.module.scss";

export default function Spinner({ size }: { size?: number }) {
    return (
        <div
            className={styles.spinner}
            style={{ "--spinner-size": typeof size === "number" ? `${size}rem` : "" }}
        />
    );
}
