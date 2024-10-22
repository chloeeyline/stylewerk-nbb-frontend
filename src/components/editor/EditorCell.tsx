import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Cross from "~/components/Icon/Cross";
import Move from "~/components/Icon/Move";
import type { EntryCell, EntryRow } from "~/redux/features/editor/editor-schemas";
import {
    removeTemplateCell,
    selectEditor,
    setSelected,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import InputHelper from "./input-helper/InputHelper";

export default function EditorCell({ cell, row }: { cell: EntryCell; row: EntryRow }) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: cell.id,
    });

    const select = () => {
        dispatch(
            setSelected({
                entryRow: row.id,
                entryCell: editor.selectedEntryCell === cell.id ? "" : cell.id,
                templateRow: row.templateID,
                templateCell:
                    editor.selectedTemplateCell === cell.templateID ? "" : cell.templateID,
            }),
        );
    };

    return (
        <div
            ref={setNodeRef}
            className={cls(
                "d-grid gap-1 p-1 grid-template-rows rounded-2",
                editor.isPreview === false &&
                    editor.isTemplate === true &&
                    cell.templateID === editor.selectedTemplateCell
                    ? "bg-info-active"
                    : "bg-base-200",
            )}
            title={cell.template?.description ?? ""}
            style={{
                "flexGrow": 1,
                "flexShrink": 1,
                "flexBasis": "0%",
                "--grid-template-rows":
                    editor.isPreview !== true && editor.isTemplate ? "auto 1fr" : "1fr",
                "transform": CSS.Transform.toString(transform),
                transition,
            }}
            onClick={select}
            {...attributes}>
            {editor.isPreview !== true && editor.isTemplate ? (
                <div className="d-flex flex-wrap gap-1" style={{ justifyContent: "flex-start" }}>
                    <button
                        type="button"
                        className="btn btn-error btn-square p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(
                                removeTemplateCell({
                                    templateRow: row.templateID,
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
            <InputHelper cell={cell} row={row} />
        </div>
    );
}
