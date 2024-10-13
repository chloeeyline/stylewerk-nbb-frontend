import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhTime = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="time"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhTimeSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
