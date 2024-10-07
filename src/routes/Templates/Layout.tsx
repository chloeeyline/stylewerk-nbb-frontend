import type React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import {
    copyTemplates,
    listTemplates,
    removeTemplates,
    selectTemplate,
    setFilter,
    setHideFilters,
    setHideList,
} from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";
import { selectEditor } from "~/redux/features/editor/editor-slice";

const TemplatesList = () => {
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(listTemplates());
    }, []);

    return (
        <>
            <ScrollContainer
                direction="vertical"
                className={cls("p-1", template.hideList ? "hidden" : undefined)}>
                {template.items &&
                    template.items.length > 0 &&
                    template.items?.map((item) => (
                        <NavLink
                            to={Routes.Templates.View.replace(RouteParams.TemplateId, item.id)}
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
                            {item.description && (
                                <div className="lrow">
                                    <div className="lcell">{item.description}</div>
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
            </ScrollContainer>
            <div className={!template.hideList ? "hidden" : undefined}></div>
        </>
    );
};

export default function TemplatesLayout() {
    const template = useAppSelector(selectTemplate);
    const editor = useAppSelector(selectEditor);
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
                <button onClick={() => dispatch(listTemplates())}>Refresh</button>
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
                {typeof editor.data?.templateID === "string" ? (
                    <>
                        <button
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                dispatch(copyTemplates({ id: editor.data.templateID }));
                            }}>
                            Copy
                        </button>
                        <button
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                dispatch(removeTemplates({ id: editor.data.templateID }));
                            }}>
                            Delete
                        </button>
                        <Link
                            to={Routes.Templates.Edit.replace(
                                RouteParams.TemplateId,
                                editor.data.templateID,
                            )}>
                            Edit
                        </Link>
                    </>
                ) : null}
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
                        <label htmlFor="description">Beschreibung</label>
                        <input
                            name="description"
                            type="text"
                            value={template.filter.description ?? ""}
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
                <TemplatesList />
                <Outlet />
            </Grid>
        </Grid>
    );
}
