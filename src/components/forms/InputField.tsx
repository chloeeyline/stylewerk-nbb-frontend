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

    if (props.type === "color") {
        return (
            <div className="d-grid">
                <label htmlFor={id}>{label}</label>
                <label
                    className={cls("input d-grid grid-template-columns", className)}
                    style={{ "--grid-template-columns": "auto 1fr", "alignItems": "center" }}>
                    <input
                        ref={ref}
                        id={id}
                        name={name}
                        placeholder={label}
                        className={cls("input p-0 size-block-100", className)}
                        {...props}
                    />
                    <span className="font-mono">({props.value})</span>
                </label>

                {(error ?? null) !== null ? <span className="error">{error}</span> : null}
            </div>
        );
    }

    if (props.type === "checkbox" || props.type === "radio") {
        return (
            <div className="d-flex gap-0" style={{ alignItems: "baseline" }}>
                <label htmlFor={id}>{label}</label>
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    placeholder={label}
                    className={cls("input d-inline size-inline-auto", className)}
                    {...props}
                />
                {(error ?? null) !== null ? <span className="error">{error}</span> : null}
            </div>
        );
    }

    return (
        <div className="d-grid">
            <label htmlFor={id}>{label}</label>
            <input
                ref={ref}
                id={id}
                name={name}
                placeholder={label}
                className={cls("input", className)}
                {...props}
            />
            {(error ?? null) !== null ? <span className="error">{error}</span> : null}
        </div>
    );
});
