import type React from "react";
import { forwardRef, useId } from "react";
import cls from "~/utils/class-name-helper";

export default forwardRef(function SelectField(
    {
        name,
        label,
        options,
        error,
        className,
        ...props
    }: React.SelectHTMLAttributes<HTMLSelectElement> & {
        name: string;
        label: string;
        options: [string, string][];
        error?: string | null;
    },
    ref: React.ForwardedRef<HTMLSelectElement>,
) {
    const id = useId();

    return (
        <div className="d-grid">
            <label htmlFor={id}>
                {label}
                {props.required === true ? <span className="clr-error">*</span> : null}
            </label>
            <select
                ref={ref}
                id={id}
                name={name}
                className={cls("input cursor-pointer", className)}
                {...props}>
                {options.map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
            {(error ?? null) !== null ? <span className="error">{error}</span> : null}
        </div>
    );
});
