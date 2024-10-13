import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhTextLong = ({ cell, isReadOnly }: InputHelperProps) => {
    return (
        <>
            <textarea
                placeholder={cell.template.text ?? ""}
                disabled={isReadOnly}
                required={cell.template.isRequired}
                onChange={() => {}}
            />
            <label>{cell.template.text ?? ""}</label>
        </>
    );
};

export const IhTextLongSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <pre>
                <code>{JSON.stringify(cell.template.metaData ?? {}, undefined, 2)}</code>
            </pre>
        </div>
    );
};
