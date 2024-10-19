import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import Equalizer from "~/components/Icon/Equalizer";
import Refresh from "~/components/Icon/Refresh";
import Grid from "~/components/layout/Grid";
import ResponsiveSidebar from "~/components/layout/ResponsiveSidebar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import {
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
        dispatch(listTemplates());
    }, []);

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
                    <Equalizer className="icon-inline" />
                </button>
            </div>
            {template.hideFilters !== true ? <TemplateFilters /> : null}
            <ScrollContainer direction="vertical" className="">
                <div className="d-grid gap-1">
                    {(template.items ?? []).map(({ id, name, username, description, tags }) => (
                        <NavLink
                            className="d-grid gap-0 no-link rounded-1 bg-base-300 p-1"
                            key={id}
                            to={Routes.Templates.View.replace(RouteParams.TemplateId, id).replace(
                                RouteParams.IsNew,
                                "false",
                            )}>
                            <div
                                className="d-flex"
                                style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                                <span className="no-line-height">{name}</span>
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
                    ))}
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

    return (
        <fieldset className="fieldset bg-base-300">
            <legend className="legend bg-base-100">{t("common.filters")}</legend>
            <Columns>
                <InputField
                    type="text"
                    label={t("common.name")}
                    name="name"
                    className="input bg-base-200"
                    value={template.filter.name ?? ""}
                    onChange={dispatchFilter}
                />
                <InputField
                    type="text"
                    label={t("formFields.description")}
                    name="description"
                    className="input bg-base-200"
                    value={template.filter.description ?? ""}
                    onChange={dispatchFilter}
                />
            </Columns>
            <Columns>
                <InputField
                    type="text"
                    label={t("formFields.tags")}
                    name="tags"
                    className="input bg-base-200"
                    value={template.filter.tags ?? ""}
                    onChange={dispatchFilter}
                />
                <InputField
                    type="text"
                    label={t("formFields.username")}
                    name="username"
                    className="input bg-base-200"
                    value={template.filter.username ?? ""}
                    onChange={dispatchFilter}
                />
            </Columns>
            <InputField
                type="checkbox"
                label={t("formFields.public")}
                name="includePublic"
                className="input"
                checked={template.filter.includePublic === "true"}
                onChange={dispatchFilterCheckbox}
            />
        </fieldset>
    );
};

export default function TemplatesLayout() {
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listTemplates());
    }, []);

    return (
        <Grid layout="header" className="gap-0 size-block-100">
            <div className="fieldset p-1 d-flex flex-wrap gap-1">
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(setHideList());
                    }}>
                    {template.hideList ? t("common.showList") : t("common.hideList")}
                </button>
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() =>
                        navigate(
                            Routes.Templates.Edit.replace(
                                RouteParams.TemplateId,
                                DEFAULT_UUID,
                            ).replace(RouteParams.IsNew, "true"),
                        )
                    }>
                    {t("common.createNewTemplate")}
                </button>
            </div>
            <ResponsiveSidebar
                showSidebar={template.hideList !== true}
                className={cls("size-block-100", template.hideList ? "gap-none" : "gap-2")}>
                <TemplatesList />
                <Outlet />
            </ResponsiveSidebar>
        </Grid>
    );
}
