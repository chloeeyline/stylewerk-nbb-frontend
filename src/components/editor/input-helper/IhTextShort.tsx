import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhTextShort = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <input
                type="text"
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhTextShortSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
