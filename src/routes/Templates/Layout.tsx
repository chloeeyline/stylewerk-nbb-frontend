import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Columns from "~/components/forms/Columns";
import InputField from "~/components/forms/InputField";
import ArrowRight from "~/components/Icon/ArrowRight";
import Equalizer from "~/components/Icon/Equalizer";
import Refresh from "~/components/Icon/Refresh";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import {
    copyTemplates,
    listTemplates,
    selectTemplate,
    setFilter,
    setHideFilters,
    setHideList,
} from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

const TemplatesList = () => {
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(listTemplates());
    }, []);

    return (
        <fieldset
            className="fieldset grid-template-rows size-block-100"
            style={{ "--grid-template-rows": "auto 1fr" }}>
            <legend className="legend d-flex gap-1 p-0">
                <span className="p-b-none p-i-0">Liste</span>
                <button type="button" className="btn p-0" onClick={() => dispatch(listTemplates())}>
                    <Refresh className="icon-inline" />
                </button>
                <button
                    type="button"
                    className={cls("btn p-0", template.hideFilters !== true ? "active" : undefined)}
                    onClick={() => dispatch(setHideFilters())}>
                    <Equalizer className="icon-inline" />
                </button>
            </legend>
            <div>
                <TemplateFilters />
            </div>
            <ScrollContainer direction="vertical" className="p-1 size-block-100">
                {typeof template.items !== "undefined"
                    ? template.items.map((item) => (
                          <NavLink
                              to={Routes.Templates.View.replace(
                                  RouteParams.TemplateId,
                                  item.id,
                              ).replace(RouteParams.IsNew, "false")}
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
                      ))
                    : null}
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
        <fieldset
            className={cls("fieldset bg-base-300", template.hideFilters ? "d-none" : undefined)}>
            <legend className="legend bg-base-100">Filter</legend>
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
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (template.items && template.items.length == 0) dispatch(listTemplates());
    }, []);

    /* const dispatchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }; */

    return (
        <Grid layout="header" className="gap-2">
            <div className="fieldset d-flex flex-wrap gap-1">
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        dispatch(setHideList());
                    }}>
                    {template.hideList ? "Liste anzeigen" : "Liste verstecken"}
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
                    Create new Template
                </button>
            </div>
            <Grid layout="sidebarStart" className={template.hideList ? "gap-none" : "gap-3"}>
                {template.hideList !== true ? <TemplatesList /> : <div></div>}
                <Outlet />
            </Grid>
        </Grid>
    );
}
