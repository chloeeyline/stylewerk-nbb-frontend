import type React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { useEffect } from "react";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import { selectEditor } from "~/redux/features/editor/editor-slice";
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
import { useTranslation } from "react-i18next";
import { DEFAULT_UUID } from "~/constants/general";

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
    const { t } = useTranslation();

    useEffect(() => {
        if (template.items && template.items.length == 0) dispatch(listTemplates());
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
                <Link to={Routes.Templates.Edit.replace(RouteParams.TemplateId, DEFAULT_UUID)}>
                    Create new Template
                </Link>
                {typeof editor.data?.templateID === "string" ? (
                    <>
                        <button
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                dispatch(copyTemplates({ id: editor.data.templateID }));
                            }}>
                            {t("common.copy")}
                        </button>
                        <button
                            onClick={() => {
                                if (typeof editor.data?.templateID !== "string") return;
                                dispatch(removeTemplates({ id: editor.data.templateID }));
                            }}>
                            {t("common.delete")}
                        </button>
                        <Link
                            to={Routes.Templates.Edit.replace(
                                RouteParams.TemplateId,
                                editor.data.templateID,
                            )}>
                            {t("common.edit")}
                        </Link>
                    </>
                ) : null}
                <form className={cls("header", template.hideFilters ? "hidden" : undefined)}>
                    <fieldset className="header">
                        <legend>Filter</legend>
                        <label htmlFor="name">{t("common.name")}</label>
                        <input
                            name="name"
                            type="text"
                            value={template.filter.name ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="description">{t("formFields.description")}</label>
                        <input
                            name="description"
                            type="text"
                            value={template.filter.description ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="tags">{t("formFields.tags")}</label>
                        <input
                            name="tags"
                            type="text"
                            value={template.filter.tags ?? ""}
                            onChange={dispatchFilter}
                        />
                        <label htmlFor="username">{t("formFields.username")}</label>
                        <input
                            name="username"
                            type="text"
                            value={template.filter.username ?? ""}
                            onChange={dispatchFilter}
                        />
                        <div>
                            <input
                                name="includePublic"
                                type="checkbox"
                                checked={template.filter.includePublic === "true"}
                                onChange={dispatchFilterCheckbox}
                            />
                            <label htmlFor="includePublic">{t("formFields.public")}</label>
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
