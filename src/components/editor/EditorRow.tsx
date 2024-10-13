import { EntryRow } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import EditorCell from "./EditorCell";

const EditorRow = ({ row }: { row: EntryRow }) => {
    const editor = useAppSelector(selectEditor);
    return (
        <div
            className="lrow"
            style={{
                backgroundColor: row.templateID == editor.selectedTemplateRow ? "green" : "red",
                margin: "0.5rem",
            }}>
            {row.items.map((cell) => (
                <EditorCell
                    key={cell.templateID}
                    cell={cell}
                    entryRowID={row.id}
                    templateRowID={row.templateID}
                />
            ))}
        </div>
    );
};

export default EditorRow;
