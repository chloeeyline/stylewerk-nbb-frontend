import cls from "~/utils/class-name-helper";
import styles from "./responsive-sidebar.module.scss";

export default function ResponsiveSidebar({
    allowOverflow,
    showSidebar,
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    allowOverflow?: boolean;
    showSidebar: boolean;
}) {
    return (
        <div
            className={cls(
                "d-grid",
                allowOverflow !== true ? "max-size-100 overflow-hidden" : undefined,
                styles.responsiveSidebar,
                showSidebar ? styles.showSidebar : undefined,
                className,
            )}
            {...props}>
            {children}
        </div>
    );
}
