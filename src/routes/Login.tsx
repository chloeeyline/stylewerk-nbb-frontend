import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Routes from "#/routes";
import LoginForm from "~/components/forms/LoginForm";
import Grid from "~/components/layout/Grid";

export default function Login() {
    const { t } = useTranslation();

    return (
        <Grid layout="contentCenter" className="size-block-100">
            <div>
                <LoginForm />
                <NavLink to={Routes.User.ResetPassword}>{t("nav.resetPassword")}</NavLink>
            </div>
        </Grid>
    );
}
