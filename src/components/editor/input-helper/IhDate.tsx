import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

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

export const IhDateSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <pre>
                <code>{JSON.stringify(cell.template.metaData ?? {}, undefined, 2)}</code>
            </pre>
        </div>
    );
};
