import type React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Routes from "#/routes";
import { selectUser } from "~/redux/features/user/user-slice";
import { useAppSelector } from "~/redux/hooks";
import LoginForm from "../forms/LoginForm";
import Grid from "../layout/Grid";
import Loader from "../layout/Loader";

export default function UserGuard({ children }: React.PropsWithChildren) {
    const { status } = useAppSelector(selectUser);
    const { t } = useTranslation();

    if (status === "loggingIn" || status === "refresh") {
        return <Loader />;
    }

    if (status === "loggedIn" || status === "failed") {
        return children;
    }

    return (
        <Grid layout="contentCenter" className="size-block-100">
            <div>
                <LoginForm onLogin={() => {}} />
                <NavLink to={Routes.User.ResetPassword}>{t("nav.resetPassword")}</NavLink>
            </div>
        </Grid>
    );
}
