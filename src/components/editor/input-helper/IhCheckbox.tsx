import { InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhCheckbox = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="checkbox"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};
