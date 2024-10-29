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
        style,
        ...props
    }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        name: string;
        label: string;
        error?: string | null;
        resize?: "block" | "inline" | "both" | "none";
    },
    ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
    const id = useId();

    return (
        <div
            className="d-grid">
            <label htmlFor={id}>
                {label}
                {props.required === true ? <span className="clr-error">*</span> : null}
            </label>
            <textarea
                ref={ref}
                id={id}
                name={name}
                placeholder={label}
                className={cls("input", className)}
                style={{
                    resize: resize ?? "none",
                    ...style
                }}
                {...props}
            />
            {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
        </div>
    );
});
