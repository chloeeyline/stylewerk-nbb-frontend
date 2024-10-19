import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Routes from "#/routes";
import RouteParams from "#/route-params";
import Editor from "~/components/editor/Editor";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { DEFAULT_UUID } from "~/constants/general";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { copyTemplates, selectTemplate } from "~/redux/features/template/template-slice";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import cls from "~/utils/class-name-helper";

export default function TemplateView() {
    const template = useAppSelector(selectTemplate);
    const editor = useAppSelector(selectEditor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { templateId, isNew } = useParams();

    return (
        <Grid layout="header">
            <fieldset className="fieldset">
                <legend className="legend">Actions</legend>
                <div className="d-flex gap-0">
                    <button
                        type="button"
                        className="btn p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            dispatch(copyTemplates({ id: editor.data.templateID }));
                        }}>
                        {t("common.copy")}
                    </button>
                    <button
                        type="button"
                        className="btn p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            navigate(
                                Routes.Templates.Edit.replace(
                                    RouteParams.TemplateId,
                                    editor.data?.templateID,
                                ).replace(RouteParams.IsNew, "false"),
                            );
                        }}>
                        {t("common.edit")}
                    </button>
                    <button
                        type="button"
                        className="btn p-0"
                        onClick={() => {
                            if (typeof editor.data?.templateID !== "string") return;
                            navigate(
                                Routes.Entries.Edit.replace(
                                    RouteParams.EntryId,
                                    editor.data.templateID,
                                ).replace(RouteParams.IsNew, "true"),
                            );
                        }}>
                        Eintrag aus Vorlage erstellen
                    </button>
                </div>
            </fieldset>
            <ScrollContainer direction="both">
                <Editor
                    id={templateId ?? DEFAULT_UUID}
                    isTemplate={true}
                    isPreview={true}
                    isNew={isNew === "true"}
                />
            </ScrollContainer>
        </Grid>
    );
}
