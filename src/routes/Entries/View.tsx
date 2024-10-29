import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

import { DEFAULT_UUID } from "#/general";
import Routes from "#/routes";
import RouteParams from "~/constants/route-params";
import Editor from "~/components/editor/Editor";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Edit from "~/components/Icon/Edit";

export default function EntryView() {
    const { entryId, isNew } = useParams();
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="size-block-100">
            <div className="fieldset d-flex gap-1">
                <NavLink className="btn p-0 btn-loader" to={Routes.Entries.List}>
                    {t("common.back")}
                </NavLink>
                <NavLink
                    className="btn btn-loader p-0"
                    to={Routes.Entries.Edit.replace(
                        RouteParams.EntryId,
                        entryId ?? DEFAULT_UUID,
                    ).replace(RouteParams.IsNew, "false")}>
                    <Edit className="icon-inline m-ie-0" />
                    {t("common.edit")}
                </NavLink>
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
