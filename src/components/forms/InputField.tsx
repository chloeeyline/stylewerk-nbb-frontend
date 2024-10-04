import type React from "react";
import { useId } from "react";

export default function InputField({
    name,
    label,
    state: { value, error },
    labelProps,
    wrapperProps,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
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
            <input value={value} name={`${name}-${id}`} placeholder={label} {...props} />
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
}
