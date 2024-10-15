import { EntryCell } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setSelected } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelper from "./input-helper/InputHelper";

const EditorCell = ({
    cell,
    entryRowID,
    templateRowID,
}: {
    cell: EntryCell;
    entryRowID: string;
    templateRowID: string;
}) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const select = () => {
        dispatch(
            setSelected({
                entryRow: entryRowID,
                entryCell: cell.id,
                templateRow: templateRowID,
                templateCell: cell.templateID,
            }),
        );
    };

    return (
        <div
            onClick={select}
            style={{
                backgroundColor: cell.templateID == editor.selectedTemplateCell ? "blue" : "",
                padding: "0.5rem",
            }}
            className="lcell"
            title={cell.template?.description ?? ""}>
            <InputHelper cell={cell} />
        </div>
    );
};

export default EditorCell;
