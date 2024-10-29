import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Routes from "#/routes";
import Editor from "~/components/editor/Editor";
import Edit from "~/components/Icon/Edit";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import RouteParams from "~/constants/route-params";
import { selectEditor } from "~/redux/features/editor/editor-slice";
import { useAppSelector } from "~/redux/hooks";

export default function EntryView() {
    const editor = useAppSelector(selectEditor);
    const { t } = useTranslation();
    const { entryId, isNew } = useParams();

    return (
        <Grid layout="header" className="size-block-100">
            <div className="fieldset d-flex gap-1">
                <NavLink className="btn p-0 btn-loader" to={Routes.Entries.List}>
                    {t("common.back")}
                </NavLink>
                {editor.data?.owned ? (
                    <NavLink
                        className="btn btn-loader p-0"
                        to={Routes.Entries.Edit.replace(
                            RouteParams.EntryId,
                            entryId ?? DEFAULT_UUID,
                        ).replace(RouteParams.IsNew, "false")}>
                        <Edit className="icon-inline m-ie-0" />
                        {t("common.edit")}
                    </NavLink>
                ) : null}
            </div>
            <ScrollContainer direction="both">
                <Editor
                    id={entryId ?? DEFAULT_UUID}
                    isTemplate={false}
                    isPreview={true}
                    isNew={isNew === "true"}
                />
            </ScrollContainer>
        </Grid>
    );
}
