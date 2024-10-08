import type React from "react";
import { forwardRef, useId } from "react";
import styles from "./form-fields.module.scss";

/* export default function SelectField({
    name,
    label,
    options,
    state: { value, error },
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    label: string;
    options: [string, string][];
    state: {
        value: string;
        error: string | null;
    };
}) {
    const id = useId();

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={`${name}-${id}`}>{label}</label>
            <select name={`${name}-${id}`} value={value} {...props}>
                {options.map(([key, value]) => (
                    <option key={key}>{value}</option>
                ))}
            </select>
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
} */

export default forwardRef(function SelectField(
    {
        name,
        label,
        options,
        error,
        ...props
    }: React.SelectHTMLAttributes<HTMLSelectElement> & {
        name: string;
        label: string;
        options: [string, string][];
        error: string | null;
    },
    ref: React.ForwardedRef<HTMLSelectElement>,
) {
    const id = useId();

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={`${name}-${id}`}>{label}</label>
            <select ref={ref} name={`${name}-${id}`} {...props}>
                {options.map(([key, value]) => (
                    <option key={key}>{value}</option>
                ))}
            </select>
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
});
