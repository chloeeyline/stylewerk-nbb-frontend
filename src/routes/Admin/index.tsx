import Routes from "#/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";

export default function Admin() {
    const { t } = useTranslation();

    return (
        <Grid layout="header" className="size-block-100">
            <h1>Admin</h1>
            <ScrollContainer direction="vertical">
                <ul>
                    <li>
                        <Link to={Routes.Admin.Translations.List}>
                            {t("nav.adminTranslations")}
                        </Link>
                    </li>
                    <li>
                        <Link to={Routes.Admin.Themes.List}>{t("nav.adminThemes")}</Link>
                    </li>
                    <li>
                        <Link to={Routes.Admin.Users.List}>{t("nav.adminUsers")}</Link>
                    </li>
                </ul>
            </ScrollContainer>
        </Grid>
    );
}
