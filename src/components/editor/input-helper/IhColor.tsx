import { InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhColor = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="color"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};
