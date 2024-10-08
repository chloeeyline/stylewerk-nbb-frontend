import type React from "react";
import { forwardRef, useId } from "react";
import styles from "./form-fields.module.scss";

/* export default function InputField({
    name,
    label,
    state: { value, error },
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    state: {
        value: string;
        error: string | null;
    };
}) {
    const id = useId();

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={`${name}-${id}`}>{label}</label>
            <input value={value} name={`${name}-${id}`} placeholder={label} {...props} />
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
} */

export default forwardRef(function InputField(
    {
        name,
        label,
        error,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        name: string;
        label: string;
        error?: string | null;
    },
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const id = useId();

    return (
        <div className={`${styles.inputWrapper} ${styles[props?.type ?? ""]}`}>
            <label htmlFor={`${name}-${id}`}>{label}</label>
            <input ref={ref} name={`${name}-${id}`} placeholder={label} {...props} />
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
});
