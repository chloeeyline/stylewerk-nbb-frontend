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
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import Spinner from "~/components/general/Spinner";
import UserGuard from "~/components/general/UserGuard";
import Cross from "~/components/Icon/Cross";
import Edit from "~/components/Icon/Edit";
import Filter from "~/components/Icon/Filter";
import Folder from "~/components/Icon/Folder";
import Globe from "~/components/Icon/Globe";
import Move from "~/components/Icon/Move";
import Plus from "~/components/Icon/Plus";
import Refresh from "~/components/Icon/Refresh";
import Grid from "~/components/layout/Grid";
import ResponsiveSidebar from "~/components/layout/ResponsiveSidebar";
import ScrollContainer from "~/components/layout/ScrollContainer";
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
    toggleHideList,
    updateFolder,
} from "~/redux/features/entry/entry-slice";
import { listTemplates, selectTemplate } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import Show from "~/components/Icon/Show";
import Hide from "~/components/Icon/Hide";
import Trash from "~/components/Icon/Trash";

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

    useEffect(() => {
        if (entry.hideList === true || entry.status === "loading" || entry.status === "succeeded")
            return;
        dispatch(listFolder());
    }, [entry.hideList]);

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
                    <Filter className="icon-inline" />
                </button>
            </div>

            {entry.hideFilters !== true ? <EntryFilters /> : null}

            <ScrollContainer direction="vertical">
                <div className="d-grid gap-1">
                    {entry.status === "loading" ? (
                        <div
                            className="d-grid p-1 bg-base-200 rounded-0 m-bs-0"
                            style={{ placeItems: "center" }}>
                            <Spinner />
                        </div>
                    ) : null}
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
    const { id, name, username, tags, owned } = item;

    return (
        <NavLink
            className={cls(
                "d-grid gap-0 no-link",
                insideFolder ? "p-0 rounded-0 bg-base-200" : "p-1 rounded-1 bg-base-300",
            )}
            to={Routes.Entries.View.replace(RouteParams.EntryId, id).replace(
                RouteParams.IsNew,
                "false",
            )}>
            <div
                className="d-flex"
                style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                <div className="no-line-height">
                    {owned === false ? <Globe className="icon-inline m-ie-0" /> : null}
                    {name}
                </div>
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
    const { t } = useTranslation();

    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const showOpen =
        entry.selectedFolder.id === item.id && item.items.length !== 0 && entry.dragMode === false;

    return (
        <div
            ref={setNodeRef}
            className={cls(
                "d-grid p-1 rounded-1",
                entry.selectedFolder.id === item.id ? "bg-info-active" : "bg-base-300",
                showOpen ? "gap-0" : "gap-none",
            )}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}>
            <div
                className="d-flex flex-wrap gap-1"
                style={{ alignItems: "center" }}
                onClick={() => {
                    if (entry.dragMode) return;

                    if (item.items.length === 0 && item.id) {
                        dispatch(detailFolder({ id: item.id }));
                    }

                    dispatch(setSelectedFolder(item));
                }}>
                {entry.dragMode ? (
                    <button type="button" className="btn btn-accent btn-square p-0" {...listeners}>
                        <Move className="fill-current-color" />
                    </button>
                ) : null}
                <span className="no-line-height">
                    <Folder className="icon-inline m-ie-1" />
                    {item.name ?? t("list.generalFolder")}
                </span>
            </div>
            {entry.selectedFolderStatus === "loading" ? (
                <div
                    className="d-grid p-1 bg-base-200 rounded-0 m-bs-0"
                    style={{ placeItems: "center" }}>
                    <Spinner />
                </div>
            ) : null}
            {showOpen ? (
                <div className="d-grid gap-1 m-bs-0">
                    {(item.items ?? []).map((folderItem) => (
                        <EntryComponent key={folderItem.id} item={folderItem} insideFolder={true} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

const CreateFolderDialog = () => {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { t } = useTranslation();

    return (
        <>
            <button
                type="button"
                className="btn p-0"
                onClick={() => {
                    if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                    dialogRef.current.showModal();
                }}>
                {entry.selectedFolder.isNew ? (
                    <>
                        <Plus className="icon-inline m-ie-0" />
                        {t("common.createNewFolder")}
                    </>
                ) : (
                    <>
                        <Edit className="icon-inline m-ie-0" />
                        {t("common.editFolder")}
                    </>
                )}
            </button>
            <dialog
                ref={dialogRef}
                className="inset-0 m-auto p-2 rounded-4 shadow no-border p-relative overflow-visible">
                <button
                    type="button"
                    className="btn btn-primary btn-square p-absolute"
                    style={{
                        insetInlineStart: "auto",
                        insetInlineEnd: "-1em",
                        insetBlockStart: "-1em",
                        insetBlockEnd: "auto",
                    }}
                    onClick={() => {
                        if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                        dialogRef.current.close();
                    }}>
                    <Cross className="icon-inline" />
                </button>
                <fieldset className="fieldset gap-1">
                    <legend className="legend">{t("common.createNewFolder")}</legend>
                    <InputField
                        label={t("common.foldername")}
                        name="foldername"
                        value={entry.selectedFolder?.name ?? ""}
                        onChange={(e) => dispatch(setSelectedFolderName(e.target.value))}
                    />
                    <button
                        className="btn btn-accent p-1"
                        onClick={() => {
                            dispatch(
                                updateFolder({
                                    model: {
                                        id: crypto.randomUUID(),
                                        name: entry.selectedFolder?.name ?? "",
                                        items: [],
                                        count: 0,
                                    },
                                }),
                            );

                            if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                            dialogRef.current.close();
                        }}>
                        {t("common.save")}
                    </button>
                </fieldset>
            </dialog>
        </>
    );
};

const CreateEntryDialog = () => {
    const { t } = useTranslation();
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button
                type="button"
                className="btn p-0"
                onClick={() => {
                    if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                    dispatch(listTemplates());
                    dialogRef.current.showModal();
                }}>
                <Plus className="icon-inline m-ie-0" />
                {t("common.createNewEntry")}
            </button>
            <dialog
                ref={dialogRef}
                className="inset-0 m-auto p-4 rounded-4 shadow no-border p-relative overflow-visible">
                <button
                    type="button"
                    className="btn btn-primary btn-square p-absolute"
                    style={{
                        insetInlineStart: "auto",
                        insetInlineEnd: "-1em",
                        insetBlockStart: "-1em",
                        insetBlockEnd: "auto",
                    }}
                    onClick={() => {
                        if (!(dialogRef.current instanceof HTMLDialogElement)) return;
                        dialogRef.current.close();
                    }}>
                    <Cross className="icon-inline" />
                </button>
                <h2>{t("common.createNewEntry")}</h2>
                {template.status === "loading" ? (
                    <div className="d-grid" style={{ placeItems: "center" }}>
                        <Spinner />
                    </div>
                ) : null}
                {typeof template.items !== "undefined" ? (
                    <ul className="reset-list">
                        {template.items.map(({ id, name }) => (
                            <li key={id}>
                                <NavLink
                                    className=""
                                    to={Routes.Entries.Edit.replace(
                                        RouteParams.EntryId,
                                        id,
                                    ).replace(RouteParams.IsNew, "true")}>
                                    {name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </dialog>
        </>
    );
};

const EntriesLayout = () => {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname !== Routes.Entries.List && entry.hideList !== true) {
            dispatch(toggleHideList());
        }

        if (pathname === Routes.Entries.List && entry.hideList === true) {
            dispatch(toggleHideList());
        }
    }, [pathname]);

    return (
        <Grid layout="header" className="gap-0 size-block-100">
            <div className="fieldset p-1 d-flex flex-wrap gap-1">
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(toggleHideList());
                    }}>
                    {entry.hideList ? (
                        <>
                            <Show className="icon-inline m-ie-0" />
                            {t("common.showList")}
                        </>
                    ) : (
                        <>
                            <Hide className="icon-inline m-ie-0" />
                            {t("common.hideList")}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(toggleDragMode());
                        if (entry.dragMode) {
                            dispatch(reorderFolder());
                        }
                    }}>
                    <Folder className="icon-inline m-ie-0" />
                    {entry.dragMode
                        ? t("list.dragFolderModeDeactive")
                        : t("list.dragFolderModeActive")}
                </button>
                {entry.hideFilters === true && entry.dragMode === false ? (
                    <CreateFolderDialog />
                ) : null}
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        entry.selectedFolder.isNew === true || entry.selectedFolder.name === null
                            ? "d-none"
                            : undefined,
                    )}
                    onClick={() => dispatch(removeFolder({ id: entry.selectedFolder.id }))}>
                    <Trash className="icon-inline m-ie-0" />
                    {t("common.deleteFolder")}
                </button>

                <CreateEntryDialog />
            </div>
            <ResponsiveSidebar
                showSidebar={entry.hideList !== true}
                className={cls("size-block-100", entry.hideList ? "gap-none" : "gap-2")}>
                <EntriesList />
                <Outlet />
            </ResponsiveSidebar>
        </Grid>
    );
};

export default function EntriesLayoutGuarded() {
    return (
        <UserGuard>
            <EntriesLayout />
        </UserGuard>
    );
}
