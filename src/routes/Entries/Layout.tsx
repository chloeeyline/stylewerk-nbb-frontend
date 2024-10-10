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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
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
    reorderFolder,
    selectEntry,
    setFilter,
    setFolders,
    toggleDragMode,
    toggleHideFilters,
    toggleHideList,
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
        <div ref={setNodeRef} className="lcontainer m-be-1" style={style} {...attributes}>
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

export default function EntriesLayout() {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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

    return (
        <Grid layout="header" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <div>
                <button
                    onClick={() => {
                        if (entry.hideFilters) dispatch(listFolder());
                        else dispatch(listEntry());
                    }}>
                    {entry.hideFilters ? t("list.refresh") : t("list.filter")}
                </button>
                <button
                    onClick={() => {
                        dispatch(toggleHideList());
                    }}>
                    {entry.hideList ? t("list.showList") : t("list.hideList")}
                </button>
                <button
                    onClick={() => {
                        dispatch(toggleHideFilters());
                    }}>
                    {entry.hideFilters ? t("list.showFilters") : t("list.hideFilters")}
                </button>
                <button
                    onClick={() => {
                        dispatch(toggleDragMode());
                        if (entry.dragMode) dispatch(reorderFolder());
                    }}>
                    {entry.dragMode
                        ? t("list.dragFolderModeActive")
                        : t("list.dragFolderModeDeactive")}
                </button>
                <form
                    className={cls(
                        "header",
                        entry.hideFilters || entry.dragMode ? "hidden" : undefined,
                    )}>
                    <fieldset className="header">
                        <legend>{t("list.filtering")}</legend>
                        <label htmlFor="name">{t("common.name")}</label>
                        <input
                            name="name"
                            type="text"
                            value={entry.filter.name ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="templateName">{t("formFields.templateName")}</label>
                        <input
                            name="templateName"
                            type="text"
                            value={entry.filter.templateName ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="tags">{t("formFields.tags")}</label>
                        <input
                            name="tags"
                            type="text"
                            value={entry.filter.tags ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="username">{t("formFields.username")}</label>
                        <input
                            name="username"
                            type="text"
                            value={entry.filter.username ?? ""}
                            onChange={dispatchFilter}
                        />
                    </fieldset>
                    <fieldset style={{ display: "grid" }}>
                        <legend>{t("formFields.visibilityGroup")}</legend>
                        <div>
                            <input
                                name="includeOwned"
                                type="checkbox"
                                checked={entry.filter.includeOwned === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="includeOwned">{t("formFields.owned")}</label>
                        </div>
                        <div>
                            <input
                                name="shared"
                                type="checkbox"
                                checked={entry.filter.shared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="shared">{t("formFields.shared")}</label>
                        </div>
                        <div>
                            <input
                                name="publicShared"
                                type="checkbox"
                                checked={entry.filter.publicShared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="public">{t("formFields.public")}</label>
                        </div>
                        <div>
                            <input
                                name="directUser"
                                type="checkbox"
                                checked={entry.filter.directUser === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="directUser">{t("formFields.directUser")}</label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <div>
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
                </div>
                <Outlet />
            </Grid>
        </Grid>
    );
}
