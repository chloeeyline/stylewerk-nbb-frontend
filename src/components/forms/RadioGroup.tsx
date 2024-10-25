import type React from "react";
import { useId } from "react";

import cls from "~/utils/class-name-helper";
import InputField from "./InputField";

export default function RadioGroup({
    name,
    label,
    direction,
    options,
    error,
    className,
    value,
    onChange,
    required,
    ...props
}: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "id" | "defaultValue" | "checked" | "defaultChecked"
> & {
    name: string;
    label: string;
    direction?: "horizontal" | "vertical";
    options: [string, string][];
    error?: string | null;
    onChange: (value: string) => void;
}) {
    const id = useId();

    return (
        <div className="d-grid">
            <label htmlFor={id}>
                {label}
                {required === true ? <span className="clr-error">*</span> : null}
            </label>
            <div
                className={cls(
                    "d-flex gap-2",
                    direction === "vertical" ? "flex-direction-column" : "flex-direction-row",
                )}>
                {options.map(([optionKey, optionValue]) => (
                    <InputField
                        type="radio"
                        key={optionKey}
                        id={id}
                        label={optionValue}
                        name={name}
                        value={optionKey}
                        checked={value === optionKey}
                        className={cls("input", className)}
                        onChange={onChange.bind(null, optionKey)}
                        {...props}
                    />
                ))}
                {required === true ? null : (
                    <button
                        type="button"
                        className={cls(
                            "btn bg-base-300 m-bs-auto p-1 rounded-1 no-line-height",
                            className,
                        )}
                        disabled={props.disabled}
                        onClick={onChange.bind(null, "")}>
                        Reset
                    </button>
                )}
            </div>
            {(error ?? null) !== null ? <span className="error m-bs-0">{error}</span> : null}
        </div>
    );
}
