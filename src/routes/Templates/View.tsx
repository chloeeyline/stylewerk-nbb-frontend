import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import RouteParams from "#/route-params";
import Routes from "#/routes";
import Editor from "~/components/editor/Editor";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import {
    copyTemplates,
    selectTemplate,
    setHideList,
} from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Edit from "~/components/Icon/Edit";
import Copy from "~/components/Icon/Copy";

export default function TemplateView() {
    const editor = useAppSelector(selectEditor);
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { templateId, isNew } = useParams();

    return (
        <Grid layout="header" className="size-block-100">
            <div className="fieldset d-flex gap-1">
                <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                        if (typeof editor.data?.templateID !== "string") return;
                        dispatch(copyTemplates({ id: editor.data.templateID }));
                        if (template.hideList === true) {
                            dispatch(setHideList());
                        }
                    }}>
                    <Copy className="icon-inline m-ie-0" />
                    {t("common.copy")}
                </button>
                {editor.data?.owned ? (
                    <NavLink
                        className="btn p-0 btn-loader"
                        to={Routes.Templates.Edit.replace(
                            RouteParams.TemplateId,
                            templateId ?? DEFAULT_UUID,
                        ).replace(RouteParams.IsNew, "false")}>
                        <Edit className="icon-inline m-ie-0" />
                        {t("common.edit")}
                    </NavLink>
                ) : null}
            </div>
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
