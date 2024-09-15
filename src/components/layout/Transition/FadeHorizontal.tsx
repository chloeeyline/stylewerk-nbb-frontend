import styles from "./fade-horizontal.module.scss";
import type { TransitionProps } from "./Transition";
import Transition from "./Transition";

/**
 * Transition between Components by fading and sliding horizontally.
 */
export default function FadeHorizontal(props: Omit<TransitionProps, "className">) {
    return <Transition className={styles.transitionWrapper} {...props} />;
}
