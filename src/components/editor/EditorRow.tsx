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
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EntryRow } from "~/redux/features/editor/editor-schemas";
import { selectEditor, setRows } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Move from "../Icon/Move";
import EditorCell from "./EditorCell";

const EditorRow = ({ row }: { row: EntryRow }) => {
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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor:
            editor.isPreview === false &&
            editor.isTemplate === true &&
            row.templateID == editor.selectedTemplateRow
                ? "green"
                : "",
        margin: "0.5rem",
    };

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
        <div className="lrow" {...attributes} ref={setNodeRef} style={style}>
            <div className={editor.isPreview ? "hidden" : undefined}>
                <Move {...listeners} />
            </div>
            <DndContext
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => dragFolder(e)}>
                <SortableContext items={row.items} strategy={verticalListSortingStrategy}>
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
    );
};

export default EditorRow;
