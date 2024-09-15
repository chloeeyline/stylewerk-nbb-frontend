import styles from "./fade.module.scss";
import type { TransitionProps } from "./Transition";
import Transition from "./Transition";

/**
 * Transition between Components by fading in and out.
 */
export default function Fade(props: Omit<TransitionProps, "className">) {
    return <Transition className={styles.transitionWrapper} {...props} />;
}
