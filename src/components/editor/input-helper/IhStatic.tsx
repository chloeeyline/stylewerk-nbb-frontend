import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";

export const IhStatic = ({ cell }: InputHelperProps) => {
    return <div>{cell.template.text ?? cell.template.text ?? ""}</div>;
};

export const IhStaticSettings = ({ cell }: { cell: EntryCell }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
