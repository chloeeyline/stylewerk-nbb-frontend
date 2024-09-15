import type React from "react";

import cls from "~/utils/class-name-helper";

type GridLayouts = "auto-1fr-vertical" | "auto-1fr-horizontal" | "items-center" | "content-center";

export default function Grid({
    children,
    layout,
    className,
    style,
}: {
    children: React.ReactNode;
    layout: GridLayouts;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div className={cls("grid", layout, className)} style={style}>
            {children}
        </div>
    );
}
