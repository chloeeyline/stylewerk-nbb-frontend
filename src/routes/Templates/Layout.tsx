import type React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import InputField from "~/components/forms/InputField";
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
        <>
            <fieldset className={template.hideList ? "hidden" : undefined}>
                <legend>Liste</legend>
                <ScrollContainer direction="vertical" className={"p-1"}>
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
            </fieldset>
            <div className={!template.hideList ? "hidden" : undefined}></div>
        </>
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
            <form>
                <fieldset>
                    <legend>Actions</legend>
                    <button type="button" className="m-1" onClick={() => dispatch(listTemplates())}>
                        Refresh
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            dispatch(setHideList());
                        }}>
                        {template.hideList ? "Liste anzeigen" : "Liste verstecken"}
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() => {
                            dispatch(setHideFilters());
                        }}>
                        {template.hideFilters ? "Filter anzeigen" : "Filter verstecken"}
                    </button>
                    <button
                        type="button"
                        className="m-1"
                        onClick={() =>
                            navigate(
                                Routes.Templates.Edit.replace(RouteParams.TemplateId, DEFAULT_UUID),
                            )
                        }>
                        Create new Template
                    </button>
                    <button
                        type="button"
                        className={cls(
                            "m-1",
                            typeof editor.data?.templateID === "string" ? undefined : "hidden",
                        )}
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data.templateID }));
                        }}>
                        {t("common.copy")}
                    </button>
                    <button
                        type="button"
                        className={cls(
                            "m-1",
                            typeof editor.data?.templateID === "string" ? undefined : "hidden",
                        )}
                        onClick={() =>
                            navigate(
                                Routes.Templates.Edit.replace(
                                    RouteParams.TemplateId,
                                    editor.data?.templateID ?? "",
                                ),
                            )
                        }>
                        {t("common.edit")}
                    </button>
                    <button
                        type="button"
                        className={cls(
                            "m-1",
                            typeof editor.data?.templateID === "string" ? undefined : "hidden",
                        )}
                        onClick={() =>
                            navigate(Routes.Entries.Edit.replace(RouteParams.EntryId, DEFAULT_UUID))
                        }>
                        Eintrag aus Vorlage erstellen
                    </button>
                </fieldset>
                <fieldset className={template.hideFilters ? "hidden" : undefined}>
                    <legend>Filter</legend>
                    <InputField
                        label={t("common.name")}
                        name="name"
                        useNameAsIs={true}
                        type="text"
                        value={template.filter.name ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.description")}
                        name="description"
                        useNameAsIs={true}
                        type="text"
                        value={template.filter.description ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.tags")}
                        name="tags"
                        useNameAsIs={true}
                        type="text"
                        value={template.filter.tags ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.username")}
                        name="username"
                        useNameAsIs={true}
                        type="text"
                        value={template.filter.username ?? ""}
                        onChange={dispatchFilter}
                    />
                    <InputField
                        label={t("formFields.public")}
                        name="includePublic"
                        useNameAsIs={true}
                        type="checkbox"
                        checked={template.filter.includePublic === "true"}
                        onChange={dispatchFilterCheckbox}
                    />
                </fieldset>
            </form>
            <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <TemplatesList />
                <Outlet />
            </Grid>
        </Grid>
    );
}
