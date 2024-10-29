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

import InputField from "~/components/forms/InputField";
import Move from "~/components/Icon/Move";
import Plus from "~/components/Icon/Plus";
import type { EntryRow } from "~/redux/features/editor/editor-schemas";
import {
    addEntryRow,
    addTemplateCell,
    removeEntryRow,
    removeTemplateRow,
    selectEditor,
    setRows,
    setTemplateRow,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import DeleteDialog from "./DeleteDialog";
import EditorCell from "./EditorCell";
import { useTranslation } from "react-i18next";

export default function EditorRow({
    row,
    initial,
    setInitial,
}: {
    row: EntryRow;
    initial: boolean;
    setInitial: React.Dispatch<boolean>;
}) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
            const rows = editor.data.items.map((item) => {
                if (item.templateID === row.templateID) {
                    const oldIndex = item.items.indexOf(
                        item.items.filter((value) => value.id === active.id)[0],
                    );
                    const newIndex = item.items.indexOf(
                        item.items.filter((value) => value.id === over.id)[0],
                    );

                    return {
                        ...item,
                        items: arrayMove(item.items, oldIndex, newIndex),
                    };
                }
                return item;
            });
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
                    <DeleteDialog
                        message={t("common.deleteWhat", { what: t("common.theRow") })}
                        initial={initial}
                        setInitial={setInitial}
                        onDelete={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(removeTemplateRow(row.templateID));
                        }}
                    />

                    <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                        <Move className="fill-current-color" />
                    </button>

                    {editor.selectedTemplateRow === row.templateID &&
                    row.items
                        .map((item) => item.template.id)
                        .includes(editor.selectedTemplateCell) ? (
                        <>
                            <InputField
                                label={t("editor.repeatableRow")}
                                name="canRepeat"
                                type="checkbox"
                                checked={selectedRowSettings()?.canRepeat ?? false}
                                onChange={dispatchRowSettings}
                            />
                            <InputField
                                label={t("editor.hideEmptyRow")}
                                name="hideOnNoInput"
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
                                    row={row}
                                    initial={initial}
                                    setInitial={setInitial}
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
                        <Plus className="fill-current-color" />
                    </button>
                ) : null}
                {editor.isPreview !== true &&
                editor.isTemplate === false &&
                row.template.canRepeat ? (
                    <div
                        className="d-flex flex-direction-column gap-1"
                        style={{ justifyContent: "space-between" }}>
                        {editor.data !== null &&
                        editor.data.items.filter((item) => item.templateID === row.templateID)
                            .length > 1 ? (
                            <DeleteDialog
                                message={t("common.deleteWhat", { what: t("common.theRow") })}
                                initial={initial}
                                setInitial={setInitial}
                                onDelete={() => {
                                    if (typeof editor.data?.templateID !== "string") return;
                                    dispatch(removeEntryRow(row.id));
                                }}
                            />
                        ) : null}
                        <button
                            type="button"
                            className="btn btn-success btn-square p-0"
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                if (editor.isTemplate) dispatch(addTemplateCell(row.templateID));
                                else dispatch(addEntryRow(row.id));
                            }}>
                            <Plus className="fill-current-color" />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
