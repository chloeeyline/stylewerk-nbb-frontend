import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LoginForm from "~/components/forms/LoginForm";
import Grid from "~/components/layout/Grid";
import { User } from "~/constants/routes";

export default function Login() {
    const { t } = useTranslation();

    return (
        <Grid layout="contentCenter" className="size-block-100">
            <div>
                <LoginForm />
                <NavLink to={User.ResetPassword}>{t("nav.resetPassword")}</NavLink>
            </div>
        </Grid>
    );
}
