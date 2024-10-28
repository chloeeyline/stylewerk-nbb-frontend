import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import InlineScroller from "~/components/layout/InlineScroller";
import { selectEditor, setTemplate, updateEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

export default function TemplateSettings({ isNew }: { isNew: boolean }) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const dispatchGeneral = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        value: boolean | number | string,
    ) => {
        dispatch(
            setTemplate({
                type: e.target.name,
                value: value,
            }),
        );
    };

    if (editor.data === null) {
        return <div>{t("common.error")}</div>;
    }

    return (
        <fieldset className="fieldset gap-1">
            <legend className="legend d-flex flex-wrap gap-0 rounded-2">
                <NavLink
                    className="btn btn-primary p-0"
                    to={
                        isNew === true
                            ? Routes.Templates.List
                            : Routes.Templates.View.replace(
                                  RouteParams.TemplateId,
                                  editor.data.templateID,
                              ).replace(RouteParams.IsNew, "false")
                    }>
                    {t("common.back")}
                </NavLink>
                <button
                    type="button"
                    className={cls(
                        "btn p-0",
                        typeof editor.data.template.name === "string" &&
                            editor.data.template.name.trim().length !== 0 &&
                            editor.error === null
                            ? "btn-primary"
                            : "btn-neutral",
                    )}
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        if (
                            typeof editor.data.template.name === "string" &&
                            editor.data.template.name.trim().length !== 0 &&
                            editor.error === null
                        )
                            dispatch(updateEditor());
                    }}>
                    {t("common.save")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(copyTemplates({ id: editor.data?.templateID }));
                    }}>
                    {t("common.copy")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (editor.data === null || typeof editor.data.templateID !== "string")
                            return;
                        dispatch(removeTemplates({ id: editor.data?.templateID }));
                        navigate(Routes.Templates.List);
                    }}>
                    {t("common.delete")}
                </button>
            </legend>
            <InlineScroller>
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label={t("common.name")}
                    name="name"
                    error={
                        editor.error !== null && editor.error === "NameMustBeUnique"
                            ? t("errorCodes.NameMustBeUnique")
                            : typeof editor.data.template.name !== "string" ||
                              editor.data.template.name.trim().length === 0
                            ? t("formErrors.pleaseEnter", {
                                  what: "Name",
                              })
                            : null
                    }
                    maxLength={100}
                    value={editor.data.template.name ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label={t("formFields.tags")}
                    name="tags"
                    maxLength={100}
                    value={editor.data.template.tags ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <InputField
                    style={{ minInlineSize: "30ch" }}
                    type="text"
                    label={t("formFields.description")}
                    name="description"
                    maxLength={100}
                    value={editor.data.template.description ?? ""}
                    onChange={(e) => dispatchGeneral(e, e.target.value)}
                />
                <div className="d-grid" style={{ placeItems: "center" }}>
                    <InputField
                        label={t("formFields.public")}
                        name="isPublic"
                        type="checkbox"
                        maxLength={100}
                        checked={editor.data.template.isPublic}
                        onChange={(e) => dispatchGeneral(e, e.target.checked)}
                    />
                </div>
            </InlineScroller>
        </fieldset>
    );
}
