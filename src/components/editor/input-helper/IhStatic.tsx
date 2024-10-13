import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhStatic = ({ cell }: InputHelperProps) => {
    return <div>{cell.template.text ?? cell.template.text ?? ""}</div>;
};

export const IhStaticSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <pre>
                <code>{JSON.stringify(cell.template.metaData ?? {}, undefined, 2)}</code>
            </pre>
        </div>
    );
};
