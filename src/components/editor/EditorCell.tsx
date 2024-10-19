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
import cls from "~/utils/class-name-helper";

export default function EditorCell({
    cell,
    entryRowID,
    templateRowID,
}: {
    cell: EntryCell;
    entryRowID: string;
    templateRowID: string;
}) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: cell.id,
    });

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
            ref={setNodeRef}
            className={cls(
                "d-grid grid-template-columns gap-0 p-1 rounded-2",
                editor.isPreview === false &&
                    editor.isTemplate === true &&
                    cell.templateID === editor.selectedTemplateCell
                    ? "bg-info-active"
                    : "bg-base-200",
            )}
            title={cell.template?.description ?? ""}
            onClick={select}
            style={{
                "flex": 1,
                "--grid-template-columns": "1fr auto",
                "transform": CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            <InputHelper cell={cell} />
            {editor.isPreview !== true ? (
                <div
                    className="d-flex flex-direction-column gap-0"
                    style={{ justifyContent: "flex-end" }}>
                    <button
                        type="button"
                        className="btn btn-error btn-square p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(
                                removeTemplateCell({
                                    templateRow: templateRowID,
                                    templateCell: cell.templateID,
                                }),
                            );
                        }}>
                        <Cross className="fill-current-color" />
                    </button>

                    <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                        <Move className="fill-current-color" />
                    </button>
                </div>
            ) : null}
        </div>
    );
}
