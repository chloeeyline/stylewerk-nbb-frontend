import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";

export default function TemplateOverview() {
    const { t } = useTranslation();
    return (
        <Grid layout="contentCenter" className="size-block-100">
            <h1>{t("common.template_other")}</h1>
            <p>{t("list.noTemplateSelected")}</p>
        </Grid>
    );
}
