import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import Equalizer from "~/components/Icon/Equalizer";
import Move from "~/components/Icon/Move";
import Refresh from "~/components/Icon/Refresh";
import Grid from "~/components/layout/Grid";
import ResponsiveSidebar from "~/components/layout/ResponsiveSidebar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import type { EntryFolder, EntryItem } from "~/redux/features/entry/entry-schemas";
import {
    clearFilters,
    detailFolder,
    listFolder,
    removeFolder,
    reorderFolder,
    selectEntry,
    setFilter,
    setFolders,
    setSelectedFolder,
    setSelectedFolderName,
    toggleDragMode,
    toggleHideFilters,
    updateFolder,
} from "~/redux/features/entry/entry-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

const EntriesList = () => {
    const { t } = useTranslation();
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const dragFolder = (e: DragEndEvent) => {
        if (entry.folders.length > 0) {
            const { active, over } = e;

            if (over && active.id !== over.id) {
                const oldIndex = entry.folders.indexOf(
                    entry.folders.filter((value) => value.id === active.id)[0],
                );
                const newIndex = entry.folders.indexOf(
                    entry.folders.filter((value) => value.id === over.id)[0],
                );
                dispatch(setFolders(arrayMove(entry.folders, oldIndex, newIndex)));
            }
        }
    };

    const filterItems = entry.items;

    const generalItems = entry.folders.filter(({ name }) => name === null);

    const folderItems = entry.folders.filter(({ name }) => name !== null);

    return (
        <fieldset
            className="fieldset grid-template-rows gap-1 size-block-100"
            style={{ "--grid-template-rows": entry.hideFilters ? "auto 1fr" : "auto auto 1fr" }}>
            <legend className="legend">{t("common.list")}</legend>
            <div
                className="d-grid grid-template-columns gap-1"
                style={{ "--grid-template-columns": "1fr 1fr" }}>
                <button
                    type="button"
                    className="btn p-1"
                    onClick={() => {
                        dispatch(listFolder());
                    }}>
                    <Refresh className="icon-inline" />
                </button>
                <button
                    type="button"
                    className={cls("btn p-1", entry.hideFilters !== true ? "active" : undefined)}
                    onClick={() => dispatch(toggleHideFilters())}>
                    <Equalizer className="icon-inline" />
                </button>
            </div>

            {entry.hideFilters !== true ? <EntryFilters /> : null}

            <ScrollContainer direction="vertical">
                <div className="d-grid gap-1">
                    {filterItems.map((item) => (
                        <EntryComponent key={item.id} item={item} insideFolder={false} />
                    ))}
                    {generalItems.map((folder) =>
                        folder.items.map((item) => (
                            <EntryComponent key={item.id} item={item} insideFolder={false} />
                        )),
                    )}
                    <DndContext
                        modifiers={[restrictToVerticalAxis]}
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => dragFolder(e)}>
                        <SortableContext items={folderItems} strategy={verticalListSortingStrategy}>
                            {folderItems.map((item) => (
                                <EntryFolderComponent key={item.id} item={item} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </ScrollContainer>
        </fieldset>
    );
};

const EntryFilters = () => {
    const { t } = useTranslation();
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();

    const dispatchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setFilter({
                type: e.target.name,
                value: e.target.value,
            }),
        );
    };

    const dispatchFilterCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setFilter({
                type: e.target.name,
                value: e.target.checked ? "true" : "false",
            }),
        );
    };

    const dispatchApplyFilters = (e?: React.FormEvent<HTMLFormElement>) => {
        if (typeof e !== "undefined") {
            e.preventDefault();
        }
        dispatch(listFolder());
    };

    const dispatchClearFilters = () => {
        dispatch(clearFilters());
        dispatchApplyFilters();
    };

    return (
        <form onSubmit={dispatchApplyFilters}>
            <fieldset className="fieldset bg-base-300">
                <legend className="legend bg-base-100">{t("list.filtering")}</legend>
                <Columns>
                    <InputField
                        type="text"
                        label={t("common.name")}
                        name="name"
                        className="bg-base-200"
                        value={entry.filter.name ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.templateName")}
                        name="templateName"
                        className="bg-base-200"
                        value={entry.filter.templateName ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.tags")}
                        name="tags"
                        className="bg-base-200"
                        value={entry.filter.tags ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.username")}
                        name="username"
                        className="bg-base-200"
                        value={entry.filter.username ?? ""}
                        onChange={dispatchFilter}
                    />
                </Columns>
                <InputField
                    type="checkbox"
                    label={t("formFields.public")}
                    name="includePublic"
                    checked={entry.filter.includePublic === "true"}
                    onChange={dispatchFilterCheckbox}
                />
                <Columns>
                    <button
                        type="button"
                        className="btn btn-accent p-1"
                        onClick={dispatchClearFilters}>
                        {t("common.reset")}
                    </button>
                    <button type="submit" className="btn btn-primary p-1">
                        {t("common.filter")}
                    </button>
                </Columns>
            </fieldset>
        </form>
    );
};

const EntryComponent = ({ item, insideFolder }: { item: EntryItem; insideFolder: boolean }) => {
    const { id, name, username, tags } = item;
    return (
        <NavLink
            className={cls(
                "d-grid gap-0 no-link rounded-1 p-1",
                insideFolder ? "bg-base-200" : "bg-base-300",
            )}
            to={Routes.Entries.View.replace(RouteParams.EntryId, id).replace(
                RouteParams.IsNew,
                "false",
            )}>
            <div
                className="d-flex"
                style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                <div className="no-line-height">{name}</div>
                <div className="no-line-height fs-1">{username}</div>
            </div>
            {tags !== null && tags.trim().length > 0 ? (
                <div className="d-flex gap-0">
                    {tags.split(",").map((tag) => (
                        <span key={tag} className="p-0 fs-1 rounded-0 bg-accent no-line-height">
                            #{tag}
                        </span>
                    ))}
                </div>
            ) : null}
        </NavLink>
    );
};

const EntryFolderComponent = ({ item }: { item: EntryFolder }) => {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(item.items.length == 0 ? false : true);
    const { t } = useTranslation();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    return (
        <div
            ref={setNodeRef}
            className={cls(
                "d-grid p-1 rounded-1 bg-base-300",
                visible && !entry.dragMode ? "gap-0" : "gap-none",
            )}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            <div
                className="d-flex flex-wrap gap-1"
                onClick={() => {
                    if (entry.dragMode) return;

                    setVisible(!visible);

                    if (item.items.length === 0 && item.id) {
                        dispatch(detailFolder({ id: item.id }));
                    }

                    dispatch(setSelectedFolder(item));
                }}>
                <button
                    type="button"
                    className={cls(
                        "btn btn-accent btn-square p-0",
                        item.name !== null && entry.dragMode ? undefined : "d-none",
                    )}
                    {...listeners}>
                    <Move className="fill-current-color" />
                </button>
                {item.name ?? t("list.generalFolder")}
            </div>
            <div className={cls("gap-1", visible && !entry.dragMode ? "d-grid" : "d-none")}>
                {(item.items ?? []).map((item) => (
                    <EntryComponent key={item.id} item={item} insideFolder={true} />
                ))}
            </div>
        </div>
    );
};

const CreateFolderDialog = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: (name: boolean) => void;
}) => {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Show or hide the dialog based on isOpen prop
    useEffect(() => {
        if (!dialogRef.current) return;
        if (isOpen) {
            dialogRef.current.showModal(); // Open the modal
        } else {
            dialogRef.current.close(); // Close the modal
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            style={{
                position: "fixed", // Use fixed positioning to allow centering relative to the viewport
                top: "50%", // Move the dialog to the center vertically
                left: "50%", // Move the dialog to the center horizontally
                transform: "translate(-50%, -50%)", // Shift back by 50% of its own width and height to center it
                border: "none",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: semi-transparent background
                zIndex: 1000, // Ensure it's on top of other elements
            }}>
            <h2>Name des Ordners</h2>
            <input
                type="text"
                value={entry.selectedFolder?.name ?? ""}
                onChange={(e) => dispatch(setSelectedFolderName(e.target.value))}
            />
            <button onClick={() => onClose(false)}>Abbruch</button>
            <button onClick={() => onClose(true)}>Speichern</button>
        </dialog>
    );
};

export default function EntriesLayout() {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const editor = useAppSelector(selectEditor);
    const navigate = useNavigate();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        dispatch(listFolder());
    }, []);

    const closeModal = (success: boolean) => {
        setDialogIsOpen(false);
        if (success === false) return;
        dispatch(
            updateFolder({
                model: {
                    id: entry.selectedFolder?.id ?? crypto.randomUUID(),
                    name: entry.selectedFolder?.name ?? "",
                    items: [],
                    count: 0,
                },
            }),
        );
    };

    return (
        <Grid layout="header" className="gap-0 size-block-100">
            <div className="fieldset p-1 d-flex flex-wrap gap-1">
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(toggleDragMode());
                        if (entry.dragMode) {
                            dispatch(reorderFolder());
                        }
                    }}>
                    {entry.dragMode
                        ? t("list.dragFolderModeDeactive")
                        : t("list.dragFolderModeActive")}
                </button>
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        entry.hideFilters === true && entry.dragMode === false
                            ? undefined
                            : "hidden",
                    )}
                    onClick={() => setDialogIsOpen(true)}>
                    {entry.selectedFolder.isNew ? "Neuen Ordner anlegen" : "Ordner bearbeiten"}
                </button>
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        entry.selectedFolder.isNew === true || entry.selectedFolder.name === null
                            ? "d-none"
                            : undefined,
                    )}
                    onClick={() => dispatch(removeFolder({ id: entry.selectedFolder.id }))}>
                    Ordner Löschen
                </button>
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        typeof editor.data?.id === "string" ? undefined : "hidden",
                    )}
                    onClick={() =>
                        navigate(
                            Routes.Entries.Edit.replace(
                                RouteParams.EntryId,
                                editor.data?.id ?? "",
                            ).replace(RouteParams.IsNew, "false"),
                        )
                    }>
                    {t("common.edit")}
                </button>
            </div>
            <CreateFolderDialog isOpen={dialogIsOpen} onClose={closeModal} />
            <ResponsiveSidebar
                showSidebar={entry.hideList !== true}
                className={cls("size-block-100", entry.hideList ? "gap-none" : "gap-2")}>
                <EntriesList />
                <Outlet />
            </ResponsiveSidebar>
        </Grid>
    );
}
