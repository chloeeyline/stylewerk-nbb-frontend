import type React from "react";
import { forwardRef, useId } from "react";
import cls from "~/utils/class-name-helper";

export default forwardRef(function TextareaField(
    {
        name,
        label,
        error,
        resize,
        className,
        ...props
    }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        name: string;
        label: string;
        error?: string | null;
        resize?: "block" | "inline" | "both" |"none";
    },
    ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
    const id = useId();

    return (
        <div className="d-grid">
            <label htmlFor={id}>{label}</label>
            <textarea
                ref={ref}
                id={id}
                name={name}
                placeholder={label}
                className={cls("input", className)}
                style={{ resize: resize ?? "none" }}
                {...props}
            />
            {(error ?? null) !== null ? <span className="error">{error}</span> : null}
        </div>
    );
});
