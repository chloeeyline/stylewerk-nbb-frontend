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
import { EntryRow } from "~/redux/features/editor/editor-schemas";
import {
    addTemplateCell,
    removeTemplateRow,
    selectEditor,
    setRows,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import AdditionSign from "../Icon/AdditionSign";
import Cross from "../Icon/Cross";
import Move from "../Icon/Move";
import EditorCell from "./EditorCell";

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

    return (
        <div
            ref={setNodeRef}
            className="d-grid grid-template-columns gap-0 p-1 bg-base-300 rounded-2"
            style={{
                "--grid-template-columns": "auto 1fr",
                "transform": CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            <div
                className="d-flex flex-direction-column gap-2"
                style={{ justifyContent: "space-between" }}>
                <button
                    type="button"
                    className="btn btn-error p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(removeTemplateRow(row.templateID));
                    }}>
                    <Cross className="fill-current-color" />
                </button>

                <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                    <Move className="fill-current-color" />
                </button>
            </div>
            <div
                className="d-grid grid-template-columns gap-0"
                style={{ "--grid-template-columns": "1fr auto" }}>
                <div className="d-flex flex-wrap gap-0">
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
                <div className="d-grid bg-base-200 rounded-2 p-1" style={{ placeItems: "center" }}>
                    <button
                        type="button"
                        className="btn btn-success btn-square p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(addTemplateCell(row.templateID));
                        }}>
                        <AdditionSign className="fill-current-color" />
                    </button>
                </div>
            </div>
        </div>
    );
}
