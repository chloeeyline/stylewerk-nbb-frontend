import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { EntryRow } from "~/redux/features/editor/editor-schemas";
import {
    addTemplateCell,
    removeTemplateRow,
    selectEditor,
    setRows,
    setTemplateRow,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import AdditionSign from "~/components/Icon/AdditionSign";
import Cross from "~/components/Icon/Cross";
import Move from "~/components/Icon/Move";
import EditorCell from "./EditorCell";
import InputField from "~/components/forms/InputField";

export default function EditorRow({ row }: { row: EntryRow }) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: row.id,
    });

    const dragFolder = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && active.id !== over.id && editor.data && editor.data.items.length > 0) {
            console.log(over.id, active.id);
            const rows = editor.data.items.map((item) => {
                if (item.templateID === row.templateID) {
                    const oldIndex = item.items.indexOf(
                        item.items.filter((value) => value.id === active.id)[0],
                    );
                    const newIndex = item.items.indexOf(
                        item.items.filter((value) => value.id === over.id)[0],
                    );

                    console.log(oldIndex, newIndex);

                    return {
                        ...item,
                        items: arrayMove(item.items, oldIndex, newIndex),
                    };
                }
                return item;
            });
            console.log(rows);

            dispatch(setRows(rows));
        }
    };

    const selectedRowSettings = () => {
        if (editor.selectedTemplateRow.length == 0 || editor.data === null) return null;
        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        return row?.template;
    };

    const dispatchRowSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplateRow({
                type: e.target.name,
                value: e.target.checked,
            }),
        );
    };

    return (
        <div
            ref={setNodeRef}
            className={cls(
                "d-grid grid-template-rows p-1 bg-base-300 rounded-2",
                editor.isPreview !== true && editor.isTemplate ? "gap-0" : "gap-none",
            )}
            style={{
                "--grid-template-rows":
                    editor.isPreview !== true && editor.isTemplate ? "auto 1fr" : "1fr",
                "transform": CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            {editor.isPreview !== true && editor.isTemplate ? (
                <div className="d-flex flex-wrap gap-1" style={{ justifyContent: "flex-start" }}>
                    <button
                        type="button"
                        className="btn btn-error btn-square p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplateRow(row.templateID));
                        }}>
                        <Cross className="fill-current-color" />
                    </button>

                    <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                        <Move className="fill-current-color" />
                    </button>

                    {editor.selectedTemplateRow === row.templateID &&
                    row.items
                        .map((item) => item.template.id)
                        .includes(editor.selectedTemplateCell) ? (
                        <>
                            <InputField
                                label="CanWrapCells"
                                name="canWrapCells"
                                useNameAsIs={true}
                                type="checkbox"
                                checked={selectedRowSettings()?.canWrapCells ?? false}
                                onChange={dispatchRowSettings}
                            />
                            <InputField
                                label="CanRepeat"
                                name="canRepeat"
                                useNameAsIs={true}
                                type="checkbox"
                                checked={selectedRowSettings()?.canRepeat ?? false}
                                onChange={dispatchRowSettings}
                            />
                            <InputField
                                label="HideOnNoInput"
                                name="hideOnNoInput"
                                useNameAsIs={true}
                                type="checkbox"
                                checked={selectedRowSettings()?.hideOnNoInput ?? false}
                                onChange={dispatchRowSettings}
                            />
                        </>
                    ) : null}
                </div>
            ) : null}
            <div
                className={cls(
                    "d-grid grid-template-columns",
                    editor.isPreview !== true && editor.isTemplate ? "gap-0" : "gap-none",
                )}
                style={{ "--grid-template-columns": "1fr auto" }}>
                <div
                    className={cls(
                        "d-flex flex-wrap",
                        editor.isPreview !== true && editor.isTemplate ? "gap-0" : "gap-1",
                    )}>
                    <DndContext
                        modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => dragFolder(e)}>
                        <SortableContext items={row.items} strategy={horizontalListSortingStrategy}>
                            {row.items.map((cell) => (
                                <EditorCell
                                    key={cell.templateID}
                                    cell={cell}
                                    entryRowID={row.id}
                                    templateRowID={row.templateID}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
                {editor.isPreview !== true && editor.isTemplate ? (
                    <button
                        type="button"
                        className="btn btn-success p-1"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(addTemplateCell(row.templateID));
                        }}>
                        <AdditionSign className="fill-current-color" />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
