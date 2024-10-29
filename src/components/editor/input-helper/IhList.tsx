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
import { useTranslation } from "react-i18next";
import { z } from "zod";

import RadioGroup from "~/components/forms/RadioGroup";
import SelectField from "~/components/forms/SelectField";
import Cross from "~/components/Icon/Cross";
import Move from "~/components/Icon/Move";
import Plus from "~/components/Icon/Plus";
import { ihDataListSchema } from "~/redux/features/editor/editor-data-schema";
import { useInputHelper } from "~/redux/features/editor/editor-hook";
import { ihMetaDataListSchema } from "~/redux/features/editor/editor-metadata-schema";
import { InputHelperProps } from "~/redux/features/editor/editor-schemas";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";
import { saveParseEmptyObject } from "~/utils/safe-json";

type IhListMetaData = z.infer<typeof ihMetaDataListSchema>;

export const IhList = ({ cell, row, isReadOnly, error }: InputHelperProps) => {
    const editor = useAppSelector(selectEditor);
    const { setData } = useInputHelper(cell, row);
    const metadata = ihMetaDataListSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const data = ihDataListSchema.safeParse(saveParseEmptyObject(cell.data));

    useEffect(() => {
        if (
            data.success === false ||
            metadata.success === false ||
            (editor.isTemplate === false && typeof data.data.value !== "undefined")
        )
            return;
        setData({
            value: metadata.data.value ?? "",
        });
    }, []);

    if (metadata.success === false) return null;
    if (data.success === false) return null;

    const getValue = (value: string) => {
        const filtered = metadata.data.list.filter(([key]) => key === value);

        if (filtered.length !== 1) {
            return undefined;
        }

        return filtered[0][1];
    };

    if (editor.isPreview) {
        return (
            <div className="d-flex" style={{ alignItems: "baseline" }}>
                {cell.template.text !== null ? <h4>{cell.template.text}:&nbsp;</h4> : null}
                {getValue(data.data?.value ?? metadata.data?.value ?? "")}
            </div>
        );
    }

    if (metadata.data.display === "0") {
        return (
            <SelectField
                label={cell.template.text ?? ""}
                name="list"
                required={cell.template.isRequired}
                disabled={isReadOnly}
                error={error}
                options={[["", "Empty"], ...metadata.data.list]}
                value={data.data.value ?? metadata.data?.value ?? ""}
                onChange={(e) => {
                    setData({
                        ...data.data,
                        value: e.target.value,
                    });
                }}
            />
        );
    }

    return (
        <RadioGroup
            label={cell.template.text ?? ""}
            name={cell.id}
            direction={metadata.data.display === "2" ? "vertical" : "horizontal"}
            options={metadata.data.list}
            value={data.data.value ?? metadata.data.value ?? ""}
            required={cell.template.isRequired}
            disabled={isReadOnly}
            error={error}
            onChange={(value) => {
                setData({
                    ...data.data,
                    value,
                });
            }}
        />
    );
};

export const IhListSettings = ({ cell, row }: InputHelperProps) => {
    const { t } = useTranslation();
    const { setMetaData } = useInputHelper(cell, row);
    const metadata = ihMetaDataListSchema.safeParse(saveParseEmptyObject(cell.template.metaData));
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        if (metadata.success === false) return;
        setMetaData(metadata.data);
    }, []);

    if (metadata.success === false) return null;

    const dispatchCellSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.name) {
            case "value":
            case "display":
                setMetaData({
                    ...metadata.data,
                    [e.target.name]: e.target.value,
                });
                break;
            default:
                return;
        }
    };

    return (
        <>
            <SelectField
                label={t("editor.ihOptionDefaultValue")}
                name="value"
                options={[["", "Empty"], ...metadata.data.list]}
                value={metadata.data.value ?? ""}
                onChange={dispatchCellSettings}
            />
            <SelectField
                label={"Darstellungsart"}
                name="display"
                options={[
                    ["0", "Liste"],
                    ["1", "H Radiobuttons"],
                    ["2", "V Radiobuttons"],
                ]}
                value={metadata.data.display ?? "0"}
                onChange={dispatchCellSettings}
            />
            <button
                type="button"
                className="btn btn-success no-line-height d-flex gap-0 p-0"
                style={{ alignItems: "center" }}
                onClick={() => setDialogIsOpen(true)}>
                Liste bearbeiten
                <Plus className="icon-inline" />
            </button>
            <Dialog
                metadata={metadata.data}
                isOpen={dialogIsOpen}
                onClose={() => setDialogIsOpen(false)}
                setMetaData={setMetaData}
            />
        </>
    );
};

const Dialog = ({
    isOpen,
    onClose,
    metadata,
    setMetaData,
}: {
    isOpen: boolean;
    onClose: () => void;
    metadata: IhListMetaData;
    setMetaData: (value: unknown) => void;
}) => {
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
        setMetaData({
            ...metadata,
            list: value,
        });
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
                    <Plus className="icon-inline" />
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
