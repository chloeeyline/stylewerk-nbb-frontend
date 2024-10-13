import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RouteParams from "~/constants/route-params";
import Routes from "~/constants/routes";
import {
    selectEditor,
    updateEditor,
    addTemplateRow,
    addTemplateCell,
    removeTemplateRow,
    removeTemplateCell,
} from "~/redux/features/editor/editor-slice";
import { copyTemplates, removeTemplates } from "~/redux/features/template/template-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";

const TemplateActions = () => {
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
        <fieldset className="lrow">
            <legend>Allgemeine Actions</legend>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(copyTemplates({ id: editor.data?.templateID }));
                }}>
                {t("common.copy")}
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(removeTemplates({ id: editor.data?.templateID }));
                }}>
                {t("common.delete")}
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => {
                    if (typeof editor.data?.templateID !== "string") return;
                    dispatch(updateEditor({ isTemplate: true }));
                }}>
                {t("common.save")}
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => dispatch(addTemplateRow())}>
                neue Zelle hinzufügen
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => dispatch(addTemplateCell())}>
                neue Zelle zur Zeile hinzufügen
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => dispatch(removeTemplateRow())}>
                zeile löschen
            </button>
            <button
                className="lcell margin"
                style={{ "--margin": "0 0.5rem 0 0" }}
                onClick={() => dispatch(removeTemplateCell())}>
                Zelle löschen
            </button>
            <Link
                className="lcell"
                to={Routes.Templates.View.replace(
                    RouteParams.TemplateId,
                    editor.data?.templateID ?? "",
                )}>
                {t("common.back")}
            </Link>
        </fieldset>
    );
};

export default TemplateActions;
