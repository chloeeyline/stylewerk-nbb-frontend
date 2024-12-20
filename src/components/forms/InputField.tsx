import type React from "react";
import { forwardRef, useId, useState } from "react";
import cls from "~/utils/class-name-helper";
import Show from "../Icon/Show";
import Hide from "../Icon/Hide";

const PasswordField = forwardRef(
    (
        {
            name,
            label,
            error,
            className,
            id,
            type,
            ...props
        }: React.InputHTMLAttributes<HTMLInputElement> & {
            name: string;
            label: string;
            error?: string | null;
        },
        ref: React.ForwardedRef<HTMLInputElement>,
    ) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);

        return (
            <div className="d-grid">
                <label htmlFor={id}>
                    {label}
                    {props.required === true ? <span className="clr-error">*</span> : null}
                </label>
                <div
                    className="d-grid grid-template-columns gap-1"
                    style={{ "--grid-template-columns": "1fr auto" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        ref={ref}
                        id={id}
                        name={name}
                        placeholder={label}
                        className={cls("input", className)}
                        {...props}
                    />
                    <button
                        type="button"
                        className="btn btn-square"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <Hide className="icon-inline" />
                        ) : (
                            <Show className="icon-inline" />
                        )}
                    </button>
                </div>
                {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
            </div>
        );
    },
);

export default forwardRef(function InputField(
    {
        name,
        label,
        error,
        className,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        name: string;
        label: string;
        error?: string | null;
    },
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const id = useId();

    if (props.type === "color") {
        return (
            <div className="d-grid min-size-inline-fit">
                <label htmlFor={id}>
                    {label}
                    {props.required === true ? <span className="clr-error">*</span> : null}
                </label>
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

                {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
            </div>
        );
    }

    if (props.type === "checkbox" || props.type === "radio") {
        return (
            <div
                className="d-flex min-size-inline-max bg-base-300 p-1 rounded-1 gap-0 m-bs-auto m-be-none"
                style={{ alignItems: "baseline" }}>
                <label htmlFor={id} className="no-line-height">
                    {label}
                    {props.required === true ? <span className="clr-error">*</span> : null}
                </label>
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    placeholder={label}
                    className={cls("input d-inline m-is-auto", className)}
                    {...props}
                />
                {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
            </div>
        );
    }

    if (props.type === "password") {
        return (
            <PasswordField
                id={id}
                ref={ref}
                label={label}
                name={name}
                error={error}
                className={className}
                {...props}
            />
        );
    }

    return (
        <div className="d-grid">
            <label htmlFor={id}>
                {label}
                {props.required === true ? <span className="clr-error">*</span> : null}
            </label>
            <input
                ref={ref}
                id={id}
                name={name}
                placeholder={label}
                className={cls(
                    "input",
                    ["date", "month", "week", "time"].includes(props?.type ?? "")
                        ? "min-size-inline-fit"
                        : undefined,
                    className,
                )}
                {...props}
            />
            {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
        </div>
    );
});
