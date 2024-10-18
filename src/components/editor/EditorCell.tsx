import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EntryCell } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setSelected } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputHelper from "./input-helper/InputHelper";
import Move from "../Icon/Move";

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

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: cell.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor:
            editor.isPreview === false &&
            editor.isTemplate === true &&
            cell.templateID == editor.selectedTemplateCell
                ? "blue"
                : "",
        padding: "0.5rem",
    };

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
            style={style}
            {...attributes}
            ref={setNodeRef}
            className="lcell"
            title={cell.template?.description ?? ""}>
            <div className={editor.isPreview ? "hidden" : undefined}>
                <Move {...listeners} />
            </div>
            <InputHelper cell={cell} />
        </div>
    );
};

export default EditorCell;
