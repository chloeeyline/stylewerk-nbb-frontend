import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhDateTime = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="datetime"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhDateTimeSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
