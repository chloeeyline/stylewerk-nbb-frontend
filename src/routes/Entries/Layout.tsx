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
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import Move from "~/components/Icon/Move";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import { EntryFolder, EntryItem } from "~/redux/features/entry/entry-schemas";
import {
    detailFolder,
    listEntry,
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
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

const EntryComponent = ({ item }: { item: EntryItem }) => {
    return (
        <NavLink
            to={Routes.Entries.View.replace(RouteParams.EntryId, item.id)}
            className="lcontainer m-be-1">
            <div className="lrow">
                {item.name && <div className="lcell">{item.name}</div>}
                {item.username && (
                    <div className="lcell" style={{ textAlign: "right" }}>
                        {item.username}
                    </div>
                )}
            </div>
            {item.templateName && (
                <div className="lrow">
                    <div className="lcell">{item.templateName}</div>
                </div>
            )}
            {item.tags && (
                <div className="lrow">
                    {item.tags.split(",").map((tag) => (
                        <div key={tag} className="lcell tag">
                            {tag}
                        </div>
                    ))}
                </div>
            )}
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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            className="lcontainer m-be-1"
            style={style}
            {...attributes}
            onClick={() => dispatch(setSelectedFolder(item))}>
            <div
                className="lrow"
                onClick={() => {
                    setVisible(!visible);
                    if (item.items.length == 0 && item.id) {
                        dispatch(detailFolder({ id: item.id }));
                    }
                }}>
                <div
                    className={cls(
                        "lcell",
                        item.name !== null && entry.dragMode ? undefined : "hidden",
                    )}>
                    <Move
                        className={item.name !== null && entry.dragMode ? undefined : "hidden"}
                        {...listeners}
                    />
                </div>
                <div className="lcell">{item.name ?? t("list.generalFolder")}</div>
            </div>
            <div
                className={cls("lrow", visible && !entry.dragMode ? undefined : "hidden")}
                style={{ marginLeft: "2rem" }}>
                <div className="lcell">
                    {item.items &&
                        item.items.length > 0 &&
                        item.items?.map((item) => <EntryComponent key={item.id} item={item} />)}
                </div>
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
        <dialog ref={dialogRef} style={styles}>
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
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        if (entry.hideFilters) dispatch(listFolder());
        else dispatch(listEntry());
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

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
        <form>
            <Grid layout="header" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <fieldset>
                    <legend>Actions</legend>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            if (entry.hideFilters) dispatch(listFolder());
                            else dispatch(listEntry());
                        }}>
                        {entry.hideFilters ? t("list.refresh") : t("list.filter")}
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            dispatch(toggleHideList());
                        }}>
                        {entry.hideList ? t("list.showList") : t("list.hideList")}
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            dispatch(toggleHideFilters());
                        }}>
                        {entry.hideFilters ? t("list.showFilters") : t("list.hideFilters")}
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            dispatch(toggleDragMode());
                            if (entry.dragMode) dispatch(reorderFolder());
                        }}>
                        {entry.dragMode
                            ? t("list.dragFolderModeDeactive")
                            : t("list.dragFolderModeActive")}
                    </button>
                    <button
                        type="button"
                        className={cls(
                            "m-1",
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
                            "m-1",
                            entry.selectedFolder.isNew === true ? "hidden" : undefined,
                        )}
                        onClick={() => dispatch(removeFolder({ id: entry.selectedFolder.id }))}>
                        Ordner Löschen
                    </button>
                </fieldset>
                <fieldset className={entry.hideFilters || entry.dragMode ? "hidden" : undefined}>
                    <legend>{t("list.filtering")}</legend>
                    <InputField
                        label={t("common.name")}
                        name="name"
                        useNameAsIs={true}
                        type="text"
                        value={entry.filter.name ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.templateName")}
                        name="templateName"
                        useNameAsIs={true}
                        type="text"
                        value={entry.filter.templateName ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.tags")}
                        name="tags"
                        useNameAsIs={true}
                        type="text"
                        value={entry.filter.tags ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.username")}
                        name="username"
                        useNameAsIs={true}
                        type="text"
                        value={entry.filter.username ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.public")}
                        name="includePublic"
                        useNameAsIs={true}
                        type="checkbox"
                        checked={entry.filter.includePublic === "true"}
                        onChange={dispatchFilterCheckbox}
                    />
                </fieldset>
                <CreateFolderDialog isOpen={dialogIsOpen} onClose={closeModal} />
                <Grid
                    layout="sidebarStart"
                    className="size-block-100 gap"
                    style={{ "--gap": "1rem" }}>
                    <fieldset>
                        <legend>Liste</legend>
                        <ScrollContainer
                            direction="vertical"
                            className={cls("p-1", entry.hideList ? "hidden" : undefined)}>
                            <DndContext
                                modifiers={[restrictToVerticalAxis]}
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(e) => dragFolder(e)}>
                                <SortableContext
                                    items={entry.folders}
                                    strategy={verticalListSortingStrategy}>
                                    {entry.folders.map((item) => (
                                        <EntryFolderComponent key={item.id} item={item} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                            {entry.items.map((item) => (
                                <EntryComponent key={item.id} item={item} />
                            ))}
                        </ScrollContainer>
                        <div className={entry!.hideList ? "hidden" : undefined}></div>
                    </fieldset>
                    <Outlet />
                </Grid>
            </Grid>
        </form>
    );
}

const styles: CSSProperties = {
    position: "fixed", // Use fixed positioning to allow centering relative to the viewport
    top: "50%", // Move the dialog to the center vertically
    left: "50%", // Move the dialog to the center horizontally
    transform: "translate(-50%, -50%)", // Shift back by 50% of its own width and height to center it
    border: "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: semi-transparent background
    zIndex: 1000, // Ensure it's on top of other elements
};
