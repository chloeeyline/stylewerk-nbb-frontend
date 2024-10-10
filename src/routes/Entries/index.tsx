import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";

export default function EntryOverview() {
    const { t } = useTranslation();
    return (
        <Grid layout="contentCenter" className="size-block-100">
            <h1>{t("common.entry_other")}</h1>
            <p>{t("list.noEntrySelected")}</p>
        </Grid>
    );
}
