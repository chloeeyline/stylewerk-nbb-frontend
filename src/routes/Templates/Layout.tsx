import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import RouteParams from "#/route-params";
import Routes from "#/routes";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import Spinner from "~/components/general/Spinner";
import UserGuard from "~/components/general/UserGuard";
import Filter from "~/components/Icon/Filter";
import Globe from "~/components/Icon/Globe";
import Hide from "~/components/Icon/Hide";
import Plus from "~/components/Icon/Plus";
import Refresh from "~/components/Icon/Refresh";
import Show from "~/components/Icon/Show";
import Grid from "~/components/layout/Grid";
import ResponsiveSidebar from "~/components/layout/ResponsiveSidebar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import {
    clearFilters,
    listTemplates,
    selectTemplate,
    setFilter,
    setHideFilters,
    setHideList,
} from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

const TemplatesList = () => {
    const { t } = useTranslation();
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            template.hideList === true ||
            template.status === "loading" ||
            template.status === "succeeded"
        )
            return;
        dispatch(listTemplates());
    }, [template.hideList]);

    return (
        <fieldset
            className="fieldset grid-template-rows gap-1 size-block-100"
            style={{ "--grid-template-rows": template.hideFilters ? "auto 1fr" : "auto auto 1fr" }}>
            <legend className="legend">{t("common.list")}</legend>
            <div
                className="d-grid grid-template-columns gap-1"
                style={{ "--grid-template-columns": "1fr 1fr" }}>
                <button type="button" className="btn p-1" onClick={() => dispatch(listTemplates())}>
                    <Refresh className="icon-inline" />
                </button>
                <button
                    type="button"
                    className={cls("btn p-1", template.hideFilters !== true ? "active" : undefined)}
                    onClick={() => dispatch(setHideFilters())}>
                    <Filter className="icon-inline" />
                </button>
            </div>

            {template.hideFilters !== true ? <TemplateFilters /> : null}

            <ScrollContainer direction="vertical">
                <div className="d-grid gap-1">
                    {template.status === "loading" ? (
                        <div
                            className="d-grid p-1 bg-base-200 rounded-0 m-bs-0"
                            style={{ placeItems: "center" }}>
                            <Spinner />
                        </div>
                    ) : null}

                    {(template.items ?? []).map(
                        ({ id, name, username, description, tags, owned }) => (
                            <NavLink
                                className="d-grid gap-0 no-link rounded-1 bg-base-300 p-1"
                                key={id}
                                to={Routes.Templates.View.replace(
                                    RouteParams.TemplateId,
                                    id,
                                ).replace(RouteParams.IsNew, "false")}>
                                <div
                                    className="d-flex"
                                    style={{
                                        justifyContent: "space-between",
                                        alignItems: "baseline",
                                    }}>
                                    <span className="no-line-height">
                                        {owned === false ? (
                                            <Globe className="icon-inline m-ie-0" />
                                        ) : null}
                                        {name}
                                    </span>
                                    <span className="no-line-height fs-1">{username}</span>
                                </div>
                                {description !== null ? (
                                    <p
                                        className="fs-2 no-line-height"
                                        style={{
                                            maxInlineSize: "15ch",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                        }}>
                                        {description}
                                    </p>
                                ) : null}
                                {tags !== null && tags.trim().length > 0 ? (
                                    <div className="d-flex gap-0">
                                        {tags.split(",").map((tag) => (
                                            <span
                                                key={tag}
                                                className="p-0 fs-1 rounded-0 bg-accent no-line-height">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </NavLink>
                        ),
                    )}
                </div>
            </ScrollContainer>
        </fieldset>
    );
};

const TemplateFilters = () => {
    const { t } = useTranslation();
    const template = useAppSelector(selectTemplate);
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
        dispatch(listTemplates());
    };

    const dispatchClearFilters = () => {
        dispatch(clearFilters());
        dispatchApplyFilters();
    };

    return (
        <form onSubmit={dispatchApplyFilters}>
            <fieldset className="fieldset bg-base-300">
                <legend className="legend bg-base-100">{t("common.filters")}</legend>
                <Columns>
                    <InputField
                        type="text"
                        label={t("common.name")}
                        name="name"
                        className="bg-base-200"
                        value={template.filter.name ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.description")}
                        name="description"
                        className="bg-base-200"
                        value={template.filter.description ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.tags")}
                        name="tags"
                        className="bg-base-200"
                        value={template.filter.tags ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        type="text"
                        label={t("formFields.username")}
                        name="username"
                        className="bg-base-200"
                        value={template.filter.username ?? ""}
                        onChange={dispatchFilter}
                    />
                </Columns>
                <InputField
                    type="checkbox"
                    label={t("formFields.public")}
                    name="includePublic"
                    checked={template.filter.includePublic === "true"}
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

const TemplatesLayout = () => {
    const { t } = useTranslation();
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname !== Routes.Templates.List && template.hideList !== true) {
            dispatch(setHideList());
        }

        if (pathname === Routes.Templates.List && template.hideList === true) {
            dispatch(setHideList());
        }
    }, [pathname]);

    return (
        <Grid layout="header" className="gap-0 size-block-100">
            <div className="fieldset p-1 d-flex flex-wrap gap-1">
                {pathname !== Routes.Templates.List ? (
                    <Link className="btn p-0" to={Routes.Templates.List}>
                        {t("common.back")}
                    </Link>
                ) : null}
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(setHideList());
                    }}>
                    {template.hideList ? (
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
                <NavLink
                    className="btn btn-loader p-0"
                    to={Routes.Templates.Edit.replace(RouteParams.TemplateId, DEFAULT_UUID).replace(
                        RouteParams.IsNew,
                        "true",
                    )}>
                    <Plus className="icon-inline m-ie-0" />
                    {t("common.createNewTemplate")}
                </NavLink>
            </div>
            <ResponsiveSidebar
                showSidebar={template.hideList !== true}
                className={cls("size-block-100", template.hideList ? "gap-none" : "gap-2")}>
                <TemplatesList />
                <Outlet />
            </ResponsiveSidebar>
        </Grid>
    );
};

export default function TemplatesLayoutGuarded() {
    return (
        <UserGuard>
            <TemplatesLayout />
        </UserGuard>
    );
}
