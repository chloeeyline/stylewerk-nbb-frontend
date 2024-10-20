import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import InputField from "~/components/forms/InputField";
import { selectEditor, setTemplate, updateEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

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
        <fieldset className="fieldset d-flex flex-wrap gap-1">
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
            <InputField
                label={t("common.name")}
                name="name"
                type="text"
                maxLength={100}
                value={editor.data.template.name ?? ""}
                onChange={dispatchGeneral}
            />
            <InputField
                label={t("formFields.description")}
                name="description"
                type="text"
                maxLength={100}
                value={editor.data.template.description ?? ""}
                onChange={dispatchGeneral}
            />
            <InputField
                className="input"
                label={t("formFields.tags")}
                name="tags"
                type="text"
                maxLength={100}
                value={editor.data.template.tags ?? ""}
                onChange={dispatchGeneral}
            />
        </fieldset>
    );
}
