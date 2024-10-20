import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import InputField from "~/components/forms/InputField";
import Cross from "~/components/Icon/Cross";
import Move from "~/components/Icon/Move";
import type { EntryCell } from "~/redux/features/editor/editor-schemas";
import {
    removeTemplateCell,
    selectEditor,
    setSelected,
    setTemplateCell,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import InputHelper from "./input-helper/InputHelper";

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
                entryCell: editor.selectedEntryCell === cell.id ? "" : cell.id,
                templateRow: templateRowID,
                templateCell:
                    editor.selectedTemplateCell === cell.templateID ? "" : cell.templateID,
            }),
        );
    };

    const selectedCellSettings = () => {
        if (
            editor.selectedTemplateRow.length == 0 ||
            editor.selectedTemplateCell.length == 0 ||
            editor.data === null
        )
            return null;

        const row = editor.data.items.find((row) => row.templateID === editor.selectedTemplateRow);
        if (!row) return null;
        const cell = row?.items.find((cell) => cell.templateID === editor.selectedTemplateCell);
        return cell ?? null;
    };

    const dispatchCellSettings = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        value: boolean | number | string,
    ) => {
        dispatch(
            setTemplateCell({
                type: e.target.name,
                value: value,
            }),
        );
    };

    return (
        <div
            ref={setNodeRef}
            className="d-grid gap-1 grid-template-rows rounded-2 bg-base-200"
            title={cell.template?.description ?? ""}
            style={{
                "flex": 1,
                "--grid-template-rows":
                    editor.isPreview !== true && editor.isTemplate ? "auto 1fr" : "1fr",
                "transform": CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            {editor.isPreview !== true && editor.isTemplate ? (
                <div
                    className="d-flex flex-wrap gap-1 p-i-1 p-bs-1"
                    style={{ justifyContent: "flex-start" }}>
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

                    {editor.selectedTemplateCell === cell.templateID ? (
                        <>
                            <InputField
                                type="checkbox"
                                label="HideOnEmpty"
                                name="hideOnEmpty"
                                useNameAsIs={true}
                                maxLength={100}
                                checked={selectedCellSettings()?.template.hideOnEmpty ?? false}
                                onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                            />
                            <InputField
                                type="checkbox"
                                label="IsRequired"
                                name="isRequired"
                                useNameAsIs={true}
                                maxLength={100}
                                checked={selectedCellSettings()?.template.isRequired ?? false}
                                onChange={(e) => dispatchCellSettings(e, e.target.checked)}
                            />
                        </>
                    ) : null}
                </div>
            ) : null}
            <div
                className={cls(
                    "p-1 rounded-2",
                    editor.isPreview === false &&
                        editor.isTemplate === true &&
                        cell.templateID === editor.selectedTemplateCell
                        ? "bg-info-active"
                        : "bg-base-200",
                )}
                onClick={select}>
                <InputHelper cell={cell} />
            </div>
        </div>
    );
}
