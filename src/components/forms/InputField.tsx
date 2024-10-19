import type React from "react";
import { forwardRef, useId } from "react";
import cls from "~/utils/class-name-helper";

export default forwardRef(function InputField(
    {
        name,
        label,
        error,
        useNameAsIs,
        className,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        name: string;
        label: string;
        error?: string | null;
        useNameAsIs?: boolean;
    },
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const id = useId();

    return (
        <div className={props.type === "checkbox" ? "d-flex gap-0" : "d-grid"}>
            <label htmlFor={id}>{label}</label>
            {props.type === "color" ? (
                <div
                    className="d-grid grid-template-columns gap-0"
                    style={{ "--grid-template-columns": "auto 1fr", "alignItems": "center" }}>
                    <input
                        ref={ref}
                        id={id}
                        name={name}
                        placeholder={label}
                        className={cls("input", className, "p-0")}
                        {...props}
                    />
                    <span className="font-mono">({props.value})</span>
                </div>
            ) : (
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    placeholder={label}
                    className={cls(
                        "input",
                        className,
                        props.type === "checkbox" ? "d-inline size-inline-auto" : undefined,
                    )}
                    {...props}
                />
            )}
            {(error ?? null) !== null ? <span className="error">{error}</span> : null}
        </div>
    );
});
