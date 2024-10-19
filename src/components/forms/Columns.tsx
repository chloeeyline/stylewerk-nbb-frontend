import type React from "react";

export default function Columns({
    columns,
    children,
}: React.PropsWithChildren<{ columns?: number }>) {
    return (
        <div
            className="d-grid grid-template-columns gap-1"
            style={{ "--grid-template-columns": `repeat(${columns ?? 2}, 1fr)` }}>
            {children}
        </div>
    );
}
