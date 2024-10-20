import type React from "react";
import cls from "~/utils/class-name-helper";

type ScrollContainerProps = React.PropsWithChildren<{
    direction?: "vertical" | "horizontal" | "both";
    className?: string;
    styles?: React.CSSProperties;
}>;

export default function ScrollContainer({
    direction,
    className,
    children,
    ...props
}: ScrollContainerProps) {
    return (
        <div
            className={cls(
                "d-block",
                direction === "vertical"
                    ? "size-block-100 max-size-block-100 overflow-block-auto"
                    : undefined,
                direction === "horizontal"
                    ? "size-inline-100 max-size-inline-100 overflow-inline-auto"
                    : undefined,
                (direction ?? "both") === "both"
                    ? "size-100 max-size-100 overflow-auto"
                    : undefined,
                className,
            )}
            {...props}>
            {children}{" "}
        </div>
    );
}
