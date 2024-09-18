import type React from "react";

import cls from "~/utils/class-name-helper";
import styles from "./grid.module.scss";

/**
 * Also make sure these classes are declared in the scss module!
 */
type GridLayouts =
    | "header"
    | "footer"
    | "headerFooter"
    | "sidebarStart"
    | "sidebarEnd"
    | "sidebarBoth"
    | "itemsCenter"
    | "contentCenter";

type GridProps = React.PropsWithChildren<{
    layout: GridLayouts;
    className?: string;
    style?: React.CSSProperties;
}>;

export default function Grid({ layout, className, ...props }: GridProps) {
    return <div className={cls(styles.grid, styles[layout], className)} {...props} />;
}
