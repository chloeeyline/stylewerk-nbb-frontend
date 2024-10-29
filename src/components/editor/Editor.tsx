import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ScrollContainer from "~/components/layout/ScrollContainer";
import {
    addTemplateRow,
    getEditor,
    reset,
    selectEditor,
    setRows,
} from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import EditorRow from "./EditorRow";
import EntrySettings from "./toolbar/EntrySettings";
import TemplateCellSettings from "./toolbar/TemplateCellSettings";
import TemplateSettings from "./toolbar/TemplateSettings";
import Plus from "~/components/Icon/Plus";
import Spinner from "../general/Spinner";

export default function Editor({
    id,
    isTemplate,
    isPreview,
    isNew,
}: {
    id: string;
    isTemplate: boolean;
    isPreview: boolean;
    isNew: boolean;
}) {
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [initial, setInitial] = useState<boolean>(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        dispatch(getEditor({ id: id, isTemplate: isTemplate, isPreview: isPreview, isNew: isNew }));
        return () => {
            dispatch(reset());
        };
    }, [id]);

    const dragFolder = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && active.id !== over.id && editor.data && editor.data.items.length > 0) {
            const oldIndex = editor.data.items.indexOf(
                editor.data.items.filter((value) => value.id === active.id)[0],
            );
            const newIndex = editor.data.items.indexOf(
                editor.data.items.filter((value) => value.id === over.id)[0],
            );

            dispatch(setRows(arrayMove(editor.data.items, oldIndex, newIndex)));
        }
    };

    if (editor.status === "idle") {
        return null;
    }

    if (editor.status === "loading") {
        return (
            <div
                className="d-grid p-1 bg-base-200 rounded-0 m-bs-0"
                style={{ placeItems: "center" }}>
                <Spinner size={10} />
            </div>
        );
    }

    if (
        (editor.status === "failed" || editor.data === null) &&
        editor.error !== "NameMustBeUnique"
    ) {
        return <div>{t("common.error")}</div>;
    }

    const getList = () => {
        if (editor.data === null) return [];
        if (editor.isTemplate === true || editor.isPreview === false) return editor.data.items;
        return editor.data.items
            .map((row) => {
                const filteredCells = row.items.filter((cell) => {
                    return !(cell.template.hideOnEmpty && !cell.data);
                });

                if (row.template.hideOnNoInput && filteredCells.every((cell) => !cell.data))
                    return null;

                return { ...row, items: filteredCells };
            })
            .filter((row) => row !== null);
    };

    return (
        <div
            className={cls(
                "d-grid max-size-block-100 size-block-100 overflow-hidden",
                editor.isPreview === false ? "grid-template-rows" : undefined,
            )}
            style={{ "--grid-template-rows": editor.isPreview === false ? "auto 1fr" : "1fr" }}>
            {editor.isPreview === false ? (
                <div>
                    {editor.isTemplate === true ? (
                        <TemplateSettings isNew={isNew} />
                    ) : (
                        <EntrySettings isNew={isNew} />
                    )}
                    {editor.isTemplate === true && editor.selectedTemplateCell.length > 0 ? (
                        <TemplateCellSettings />
                    ) : null}
                </div>
            ) : null}
            <ScrollContainer direction="vertical">
                <fieldset className="fieldset rounded-3">
                    <legend className="legend">
                        {editor.isPreview ? t("common.preview") : t("common.editor")}
                    </legend>
                    <div className="d-grid max-size-100 gap-1">
                        <DndContext
                            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) => dragFolder(e)}>
                            <SortableContext
                                items={getList()}
                                strategy={verticalListSortingStrategy}>
                                {getList().length > 0 &&
                                    getList().map((row) =>
                                        editor.isTemplate ? (
                                            <EditorRow initial={initial} setInitial={setInitial} key={row.templateID} row={row} />
                                        ) : (
                                            <EditorRow initial={initial} setInitial={setInitial} key={row.id} row={row} />
                                        ),
                                    )}
                            </SortableContext>
                        </DndContext>
                        {editor.isPreview !== true && editor.isTemplate === true ? (
                            <div
                                className="d-grid bg-base-300 rounded-2 p-1"
                                style={{ placeItems: "center" }}>
                                <button
                                    type="button"
                                    className="btn btn-success p-1 no-line-height d-flex gap-1"
                                    style={{ alignItems: "center" }}
                                    onClick={() => dispatch(addTemplateRow())}>
                                    {t("editor.addNewRow")}
                                    <Plus className="icon-inline" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                </fieldset>
            </ScrollContainer>
        </div>
    );
}
