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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getEditor, reset, selectEditor, setRows } from "~/redux/features/editor/editor-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Grid from "../layout/Grid";
import ScrollContainer from "../layout/ScrollContainer";
import EditorRow from "./EditorRow";
import EntrySettings from "./toolbar/EntrySettings";
import TemplateCellSettings from "./toolbar/TemplateCellSettings";
import TemplateSettings from "./toolbar/TemplateSettings";
import cls from "~/utils/class-name-helper";

const Editor = ({
    id,
    isTemplate,
    isPreview,
    isNew,
}: {
    id: string;
    isTemplate: boolean;
    isPreview: boolean;
    isNew: boolean;
}) => {
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

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
            console.log(over.id, active.id);
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
        return <div>{t("common.loading")}</div>;
    }

    if (editor.status === "failed" || editor.data === null) {
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
                "d-grid max-block-size-100 block-size-100",
                editor.isPreview === false ? "grid-template-rows" : undefined,
            )}
            style={{ "--grid-template-rows": "auto 1fr" }}>
            {editor.isPreview === false ? (
                <div>
                    {editor.isTemplate === true ? <TemplateSettings /> : <EntrySettings />}
                    {editor.isTemplate === true && editor.selectedTemplateCell.length > 0 ? (
                        <TemplateCellSettings />
                    ) : null}
                </div>
            ) : null}
            <fieldset className="fieldset">
                <legend className="legend">Editor</legend>
                <ScrollContainer direction="both">
                    <div className="max-size-100">
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
                                            <EditorRow key={row.templateID} row={row} />
                                        ) : (
                                            <EditorRow key={row.id} row={row} />
                                        ),
                                    )}
                            </SortableContext>
                        </DndContext>
                    </div>
                </ScrollContainer>
            </fieldset>
        </div>
    );
};

export default Editor;
