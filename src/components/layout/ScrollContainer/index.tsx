import type React from "react";
import styles from "./scroll-container.module.scss";
import { CSSProperties } from "react";
import cls from "~/utils/class-name-helper";

type ScrollContainerProps = React.PropsWithChildren<{
    direction?: "vertical" | "horizontal" | "both";
    className?: string;
    styles?: CSSProperties;
}>;

export default function ScrollContainer({ direction, className, ...props }: ScrollContainerProps) {
    return (
        <div
            className={cls(styles.scrollContainer, styles[direction ?? "both"], className)}
            {...props}
        />
    );
}
