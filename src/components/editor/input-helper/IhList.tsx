import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import InputField from "~/components/forms/InputField";
import SelectField from "~/components/forms/SelectField";
import AdditionSign from "~/components/Icon/AdditionSign";
import Cross from "~/components/Icon/Cross";
import Move from "~/components/Icon/Move";
import { EntryCell, InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { CallSetData, selectEditor, setMetadata } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

const ihMetaDataSchema = z
    .object({
        list: z
            .array(z.tuple([z.string(), z.string()]))
            .catch([[crypto.randomUUID.toString(), ""]])
            .default([[crypto.randomUUID.toString(), ""]]),
        value: z.string().optional().catch(undefined).default(undefined),
        radiobuttons: z.boolean().catch(false).default(false),
    })
    .strip();

type IhListMetaData = z.infer<typeof ihMetaDataSchema>;

const ihDataSchema = z
    .object({
        value: z.string().optional().catch(undefined).default(undefined),
    })
    .strip();

export const IhList = ({ cell, row, isReadOnly }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataSchema.safeParse(saveParseEmptyObject(cell.data));
    if (metadata.success === false) return null;
    if (data.success === false) return null;

    if (metadata.data.radiobuttons === true) {
        return (
            <div className="d-flex gap-2">
                {metadata.data.list.map(([key, value]) => (
                    <InputField
                        key={key}
                        type="radio"
                        label={value}
                        name={cell.id}
                        checked={data.data.value === key}
                        onChange={(e) => {
                            CallSetData(dispatch, editor, cell, row, {
                                ...data.data,
                                value: e.target.checked ? key : "",
                            });
                        }}
                    />
                ))}
            </div>
        );
    }

    const getValue = (value: string) => {
        return metadata.data.list.filter(([key]) => key === value)[0][1];
    };

    if (editor.isPreview) {
        return (
            <div>
                <p>{cell.template.text ?? ""}</p>
                {getValue(data.data.value) ?? getValue(metadata.data.value) ?? ""}
            </div>
        );
    }

    return (
        <SelectField
            required={cell.template.isRequired}
            disabled={isReadOnly}
            name="list"
            label={cell.template.text ?? ""}
            options={metadata.data.list}
            value={data.data.value ?? metadata.data.value ?? ""}
            onChange={(e) => {
                CallSetData(dispatch, editor, cell, row, {
                    ...data.data,
                    value: e.target.value,
                });
            }}
        />
    );
};

export const IhListSettings = ({ cell }: { cell: EntryCell }) => {
    const dispatch = useAppDispatch();
    const metadata = ihMetaDataSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        if (metadata.success === false) return;
        dispatch(setMetadata(JSON.stringify(metadata.data)));
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "value":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.value,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    const dispatchCellSettings2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        switch (e.target.name) {
            case "radiobuttons":
                dispatch(
                    setMetadata(
                        JSON.stringify({
                            ...metadata.data,
                            [e.target.name]: e.target.checked,
                        }),
                    ),
                );
                break;
            default:
                return;
        }
    };

    return (
        <>
            <SelectField
                required={cell.template.isRequired}
                name="value"
                label={"Standartwert"}
                options={metadata.data.list}
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <InputField
                type="checkbox"
                label="Radiobuttons verwenden"
                name="radiobuttons"
                checked={metadata.data.radiobuttons ?? false}
                onChange={dispatchCellSettings2}
            />
            <div className="d-grid rounded-1 p-0" style={{ placeItems: "center" }}>
                <button
                    type="button"
                    className="btn btn-success no-line-height d-flex gap-0 p-0"
                    style={{ alignItems: "center" }}
                    onClick={() => setDialogIsOpen(true)}>
                    {"Liste bearbeiten"}
                    <AdditionSign className="icon-inline" />
                </button>
            </div>
            <Dialog
                metadata={metadata.data}
                isOpen={dialogIsOpen}
                onClose={() => setDialogIsOpen(false)}
            />
        </>
    );
};

const Dialog = ({
    isOpen,
    onClose,
    metadata,
}: {
    isOpen: boolean;
    onClose: () => void;
    metadata: IhListMetaData;
}) => {
    const dispatch = useAppDispatch();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (isOpen) dialogRef.current.showModal();
        else dialogRef.current.close();
    }, [isOpen]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const setList = (value: [string, string][]) => {
        dispatch(
            setMetadata(
                JSON.stringify({
                    ...metadata,
                    list: value,
                }),
            ),
        );
    };

    const dragItem = (e: DragEndEvent) => {
        if (metadata.list.length <= 1) return;
        const { active, over } = e;

        if (over === null || active.id === over.id) return;
        const oldIndex = metadata.list.indexOf(
            metadata.list.filter(([key]) => key === active.id)[0],
        );
        const newIndex = metadata.list.indexOf(metadata.list.filter(([key]) => key === over.id)[0]);
        setList(arrayMove(metadata.list, oldIndex, newIndex));
    };

    return (
        <dialog
            ref={dialogRef}
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose();
            }}
            style={{
                position: "fixed", // Use fixed positioning to allow centering relative to the viewport
                top: "50%", // Move the dialog to the center vertically
                left: "50%", // Move the dialog to the center horizontally
                transform: "translate(-50%, -50%)", // Shift back by 50% of its own width and height to center it
                border: "none",
                backgroundColor: "rgba(0, 0, 0, 1)", // Optional: semi-transparent background
                zIndex: 1000, // Ensure it's on top of other elements
            }}>
            <div>Optionen bearbeiten</div>
            <DndContext
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => dragItem(e)}>
                <SortableContext
                    items={metadata.list.map(([key]) => key)}
                    strategy={verticalListSortingStrategy}>
                    {metadata.list.map(([key, value]) => (
                        <DialogItem
                            key={key}
                            id={key}
                            value={value}
                            metadata={metadata}
                            setList={setList}></DialogItem>
                    ))}
                </SortableContext>
            </DndContext>
            <div className="d-grid gap-1 p-0" style={{ placeItems: "center" }}>
                <button
                    type="button"
                    className="btn btn-success p-1 no-line-height d-flex gap-1"
                    style={{ alignItems: "center" }}
                    onClick={() => {
                        const temp = metadata.list;
                        temp.push([crypto.randomUUID(), ""]);
                        setList(temp);
                    }}>
                    {"Neues Element"}
                    <AdditionSign className="icon-inline" />
                </button>
            </div>
        </dialog>
    );
};

const DialogItem = ({
    id,
    value,
    metadata,
    setList,
}: {
    id: string;
    value: string;
    metadata: IhListMetaData;
    setList: (value: [string, string][]) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="d-flex gap-1 p-0"
            style={{ transform: CSS.Transform.toString(transform), transition }}
            {...attributes}>
            <button
                type="button"
                className="btn btn-error btn-square p-0"
                onClick={() => setList(metadata.list.filter(([k]) => k !== id))}>
                <Cross className="fill-current-color" />
            </button>

            <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                <Move className="fill-current-color" />
            </button>
            <input
                value={value}
                onChange={(e) =>
                    setList(
                        metadata.list.map(([k, v]) => (k === id ? [k, e.target.value] : [k, v])),
                    )
                }
            />
        </div>
    );
};
