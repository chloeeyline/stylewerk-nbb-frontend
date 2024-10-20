import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import { selectEditor, setTemplate, updateEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Columns from "~/components/forms/Columns";
import InlineScroller from "~/components/layout/InlineScroller";

export default function TemplateSettings({ isNew }: { isNew: boolean }) {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const dispatchGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setTemplate({
                type: e.target.name,
                value: e.target.value,
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
                    className="btn btn-primary p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
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
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(removeTemplates({ id: editor.data?.templateID }));
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
                    maxLength={100}
                    value={editor.data.template.name ?? ""}
                    onChange={dispatchGeneral}
                />
                <InputField
                    style={{ minInlineSize: "10ch" }}
                    type="text"
                    label={t("formFields.tags")}
                    name="tags"
                    maxLength={100}
                    value={editor.data.template.tags ?? ""}
                    onChange={dispatchGeneral}
                />
                <InputField
                    style={{ minInlineSize: "30ch" }}
                    type="text"
                    label={t("formFields.description")}
                    name="description"
                    maxLength={100}
                    value={editor.data.template.description ?? ""}
                    onChange={dispatchGeneral}
                />
            </InlineScroller>
        </fieldset>
    );
}
