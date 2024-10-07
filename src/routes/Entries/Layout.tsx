import { Outlet, useLocation } from "react-router-dom";

import Routes from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ListSidebar from "~/components/layout/ListSidebar";
import { MemoNavbar } from "~/components/layout/NavBar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useEntries } from "./api/entries";
import type { EntryListResponse } from "./api/types";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
    listFolder,
    selectEntry,
    setFilter,
    setHideFilters,
    setHideList,
} from "~/redux/features/entry/entry-slice";
import cls from "~/utils/class-name-helper";

const EntriesResult = ({ result }: { result: EntryListResponse }) => {
    const { ok, loading } = result;

    if (loading === true) {
        return <div>Loading...</div>;
    }

    if (ok === false) {
        const { error } = result;

        return <ErrorElement error={error} />;
    }

    const { general, folders } = result;

    return (
        <>
            {general.length >= 1 && (
                <MemoNavbar
                    direction="vertical"
                    routes={general.map(({ id, name }) => ({
                        type: "link",
                        url: `${Routes.Entries.List}/${id}`,
                        name,
                    }))}
                />
            )}
            {folders.length >= 1 && (
                <ul>
                    {folders.map(({ id, name, entries }) => (
                        <li key={id}>
                            {name}
                            <MemoNavbar
                                direction="vertical"
                                routes={entries.map(({ id, name }) => ({
                                    type: "link",
                                    url: `${Routes.Entries.List}/${id}`,
                                    name,
                                }))}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

const EntriesList = () => {
    const { pathname } = useLocation();
    const [result, refresh] = useEntries();

    return (
        <ListSidebar
            collapsed={pathname === Routes.Entries.List}
            onRefresh={refresh}
            refreshing={result.loading}>
            <EntriesResult result={result} />
        </ListSidebar>
    );
};

export default function EntriesLayout() {
    const template = useAppSelector(selectEntry);
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

    return (
        <Grid layout="header" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <div>
                <button onClick={() => dispatch(listFolder())}>Refresh</button>
                <button
                    onClick={() => {
                        dispatch(setHideList());
                    }}>
                    {template.hideList ? "Liste anzeigen" : "Liste verstecken"}
                </button>
                <button
                    onClick={() => {
                        dispatch(setHideFilters());
                    }}>
                    {template.hideFilters ? "Filter anzeigen" : "Filter verstecken"}
                </button>
                <form className={cls("header", template.hideFilters ? "hidden" : undefined)}>
                    <fieldset className="header">
                        <legend>Filter</legend>
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={template.filter.name ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="templateName">Beschreibung</label>
                        <input
                            name="templateName"
                            type="text"
                            value={template.filter.templateName ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="tags">Tags</label>
                        <input
                            name="tags"
                            type="text"
                            value={template.filter.tags ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="username">Benutzername</label>
                        <input
                            name="username"
                            type="text"
                            value={template.filter.username ?? ""}
                            onChange={dispatchFilter}
                        />
                    </fieldset>
                    <fieldset style={{ display: "grid" }}>
                        <legend>Sichtbarkeit</legend>
                        <div>
                            <input
                                name="includeOwned"
                                type="checkbox"
                                checked={template.filter.includeOwned === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="includeOwned">Eigene</label>
                        </div>
                        <div>
                            <input
                                name="shared"
                                type="checkbox"
                                checked={template.filter.shared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="shared">Geteilt</label>
                        </div>
                        <div>
                            <input
                                name="publicShared"
                                type="checkbox"
                                checked={template.filter.publicShared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="public">Öffentliche</label>
                        </div>
                        <div>
                            <input
                                name="directUser"
                                type="checkbox"
                                checked={template.filter.directUser === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="directUser">Genauer Benutzername</label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <EntriesList />
                <ScrollContainer direction="vertical">
                    <Outlet />
                </ScrollContainer>
            </Grid>
        </Grid>
    );
}
