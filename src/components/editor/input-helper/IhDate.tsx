import { InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhDate = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="date"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};
