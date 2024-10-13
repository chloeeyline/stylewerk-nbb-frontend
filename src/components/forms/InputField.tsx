import type React from "react";
import { forwardRef, useId } from "react";
import styles from "./form-fields.module.scss";

export default forwardRef(function InputField(
    {
        name,
        label,
        error,
        useNameAsIs,
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
        <div className={`${styles.inputWrapper} ${styles[props?.type ?? ""]}`}>
            <label htmlFor={useNameAsIs ? name : `${name}-${id}`}>{label}</label>
            <input
                ref={ref}
                name={useNameAsIs ? name : `${name}-${id}`}
                placeholder={label}
                {...props}
            />
            {error !== null ? <span>{error}</span> : null}
        </div>
    );
});
