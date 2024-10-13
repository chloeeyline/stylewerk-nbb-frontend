import type React from "react";
import styles from "./form-fields.module.scss";

export default function Columns({
    columns,
    children,
}: React.PropsWithChildren<{ columns?: number }>) {
    return (
        <div className={styles.columns} style={{ "--columns": columns ?? 2 }}>
            {children}
        </div>
    );
}
