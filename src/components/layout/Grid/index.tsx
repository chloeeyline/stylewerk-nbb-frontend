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

export default function Grid({
    layout,
    allowOverflow,
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    layout: GridLayouts;
    allowOverflow?: boolean;
}) {
    return (
        <div
            className={cls(
                "d-grid",
                allowOverflow !== true ? "max-size-100 overflow-hidden" : undefined,
                styles[layout],
                className,
            )}
            {...props}>
            {children}
        </div>
    );
}
