import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import { EntryFolder } from "~/redux/features/entry/entry-schemas";
import {
    detailFolder,
    listFolder,
    selectEntry,
    setFilter,
    setHideFilters,
    setHideList,
} from "~/redux/features/entry/entry-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

const EntriesResult = ({ result }: { result: EntryFolder }) => {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(result.items.length == 0 ? false : true);

    return (
        <div className="lcontainer">
            <div
                className="lrow"
                onClick={() => {
                    setVisible(!visible);
                    if (result.items.length == 0 && result.id) {
                        dispatch(detailFolder({ id: result.id }));
                    }
                }}>
                <div className="lcell">{result.name ?? "Unbenannt"}</div>
            </div>
            <div
                className={cls("lrow", visible ? undefined : "hidden")}
                style={{ marginLeft: "1rem" }}>
                <div className="lcell">
                    {result.items &&
                        result.items.length > 0 &&
                        result.items?.map((item) => (
                            <NavLink
                                to={Routes.Entries.View.replace(RouteParams.EntryId, item.id)}
                                key={item.id}
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
                        ))}
                </div>
            </div>
        </div>
    );
};

export default function EntriesLayout() {
    const entry = useAppSelector(selectEntry);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (entry.items.length == 0) dispatch(listFolder());
    }, []);

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
                    {entry.hideList ? "Liste anzeigen" : "Liste verstecken"}
                </button>
                <button
                    onClick={() => {
                        dispatch(setHideFilters());
                    }}>
                    {entry.hideFilters ? "Filter anzeigen" : "Filter verstecken"}
                </button>
                <form className={cls("header", entry.hideFilters ? "hidden" : undefined)}>
                    <fieldset className="header">
                        <legend>Filter</legend>
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={entry.filter.name ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="templateName">Beschreibung</label>
                        <input
                            name="templateName"
                            type="text"
                            value={entry.filter.templateName ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="tags">Tags</label>
                        <input
                            name="tags"
                            type="text"
                            value={entry.filter.tags ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="username">Benutzername</label>
                        <input
                            name="username"
                            type="text"
                            value={entry.filter.username ?? ""}
                            onChange={dispatchFilter}
                        />
                    </fieldset>
                    <fieldset style={{ display: "grid" }}>
                        <legend>Sichtbarkeit</legend>
                        <div>
                            <input
                                name="includeOwned"
                                type="checkbox"
                                checked={entry.filter.includeOwned === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="includeOwned">Eigene</label>
                        </div>
                        <div>
                            <input
                                name="shared"
                                type="checkbox"
                                checked={entry.filter.shared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="shared">Geteilt</label>
                        </div>
                        <div>
                            <input
                                name="publicShared"
                                type="checkbox"
                                checked={entry.filter.publicShared === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="public">Öffentliche</label>
                        </div>
                        <div>
                            <input
                                name="directUser"
                                type="checkbox"
                                checked={entry.filter.directUser === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="directUser">Genauer Benutzername</label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <div>
                    <ScrollContainer className={cls("p-1", entry.hideList ? "hidden" : undefined)}>
                        {entry.items &&
                            entry.items.map((item) => (
                                <EntriesResult key={item.id} result={item} />
                            ))}
                    </ScrollContainer>
                    <div className={entry!.hideList ? "hidden" : undefined}></div>
                </div>
                <Outlet />
            </Grid>
        </Grid>
    );
}
