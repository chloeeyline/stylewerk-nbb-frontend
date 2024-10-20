import type React from "react";

import ArrowRight from "~/components/Icon/ArrowRight";
import cls from "~/utils/class-name-helper";

export default function InlineScroller({
    children,
    className,
}: React.PropsWithChildren & {
    className?: string;
}) {
    return (
        <div
            className="d-grid grid-template-columns"
            style={{ "--grid-template-columns": "auto 1fr auto" }}>
            <div className="d-grid p-0" style={{ placeItems: "center" }}>
                <ArrowRight
                    className="fill-current-color"
                    style={{ transform: "rotate(180deg)" }}
                />
            </div>
            <div
                className={cls("d-flex gap-1 max-size-inline-100 overflow-inline-auto", className)}>
                {children}
            </div>
            <div className="d-grid p-0" style={{ placeItems: "center" }}>
                <ArrowRight className="fill-current-color" />
            </div>
        </div>
    );
}
