import type React from "react";
import { useState } from "react";
import cls from "~/utils/class-name-helper";
import styles from "./list-sidebar.module.scss";

type ListSidebarProps = React.PropsWithChildren<{
    collapsed?: boolean;
    refreshing?: boolean;
    onRefresh?: () => void;
    onAdd?: () => void;
    onAddFolder?: () => void;
    onOpenFilters?: () => void;
}>;

export default function ListSidebar({
    collapsed,
    refreshing,
    onRefresh,
    onAdd,
    onAddFolder,
    onOpenFilters,
    children,
}: ListSidebarProps) {
    const [open, setOpen] = useState(collapsed !== true);

    return (
        <div className={cls(styles.sidebar, open ? styles.open : styles.close)}>
            <button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</button>
            <div className={styles.contents}>
                <div>
                    {onRefresh && (
                        <button className={refreshing ? "refreshing" : ""} onClick={onRefresh}>
                            Refresh
                        </button>
                    )}
                    {onAdd && <button onClick={onAdd}>Add</button>}
                    {onAddFolder && <button onClick={onAddFolder}>AddFolder</button>}
                    {onOpenFilters && <button onClick={onOpenFilters}>OpenFilters</button>}
                </div>
                {children}
            </div>
        </div>
    );
}
