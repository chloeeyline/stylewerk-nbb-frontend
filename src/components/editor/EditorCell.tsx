import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EntryCell } from "~/redux/features/editor/editor-schemas";
import {
    removeTemplateCell,
    selectEditor,
    setSelected,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Cross from "../Icon/Cross";
import Move from "../Icon/Move";
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
                : undefined,
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
                <button type="button" className="btn btn-accent p-0" {...listeners}>
                    <Move />
                </button>
                <button
                    type="button"
                    className="btn btn-accent p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(
                            removeTemplateCell({
                                templateRow: templateRowID,
                                templateCell: cell.templateID,
                            }),
                        );
                    }}>
                    <Cross />
                </button>
            </div>
            <InputHelper cell={cell} />
        </div>
    );
};

export default EditorCell;
