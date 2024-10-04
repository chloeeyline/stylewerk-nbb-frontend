import type React from "react";
import { useId } from "react";

export default function SelectField({
    name,
    label,
    options,
    state: { value, error },
    labelProps,
    wrapperProps,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    label: string;
    options: [string, string][];
    state: {
        value: string;
        error: string | null;
    };
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}) {
    const id = useId();

    return (
        <div {...wrapperProps}>
            <label htmlFor={`${name}-${id}`} {...labelProps}>
                {label}
            </label>
            <select name={`${name}-${id}`} value={value} {...props}>
                {options.map(([key, value]) => (
                    <option key={key}>{value}</option>
                ))}
            </select>
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
}
