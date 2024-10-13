import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

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

export const IhColorSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
