import styles from "./fade-vertical.module.scss";
import type { TransitionProps } from "./Transition";
import Transition from "./Transition";

/**
 * Transition between Components by fading and sliding vertically.
 */
export default function FadeVertical(props: Omit<TransitionProps, "className">) {
    return <Transition className={styles.transitionWrapper} {...props} />;
}
