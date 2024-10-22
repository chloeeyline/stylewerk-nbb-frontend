import { Outlet, ScrollRestoration } from "react-router-dom";

import Routes from "#/routes";
import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";
import type { NavbarRoute } from "~/components/layout/NavBar";
import { MemoNavbar } from "~/components/layout/NavBar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { logoutUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const RootNavBar = () => {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);

    const loggedIn = user.status === "loggedIn";
    const isAdmin = loggedIn && user.admin === true;

    const dispatch = useAppDispatch();

    const routes: (NavbarRoute | undefined)[] = [
        {
            type: "link",
            url: Routes.Home,
            name: t("nav.homepage"),
        },
        loggedIn
            ? {
                  type: "link",
                  url: Routes.Entries.List,
                  name: t("nav.entries"),
              }
            : undefined,
        loggedIn
            ? {
                  type: "link",
                  url: Routes.Templates.List,
                  name: t("nav.templates"),
              }
            : undefined,
        isAdmin
            ? {
                  type: "link",
                  url: Routes.Admin.Translations.List,
                  name: t("nav.adminTranslations"),
              }
            : undefined,
        isAdmin
            ? {
                  type: "link",
                  url: Routes.Admin.Themes.List,
                  name: t("nav.adminThemes"),
              }
            : undefined,
        loggedIn
            ? {
                  type: "link",
                  url: Routes.User.Index,
                  name: t("nav.user"),
              }
            : undefined,
        loggedIn
            ? {
                  type: "button",
                  onClick: () => {
                      dispatch(logoutUser());
                  },
                  name: t("common.logout"),
              }
            : undefined,
        !loggedIn
            ? {
                  type: "link",
                  url: Routes.Login,
                  name: t("nav.login"),
              }
            : undefined,
        !loggedIn
            ? {
                  type: "link",
                  url: Routes.Registration,
                  name: t("nav.registration"),
              }
            : undefined,
    ];

    return <MemoNavbar routes={routes} />;
};

export default function RootLayout() {
    return (
        <>
            <Grid layout="header" className="size-block-100 gap-1 p-1">
                <RootNavBar />
                <ScrollContainer direction="vertical">
                    <Outlet />
                </ScrollContainer>
            </Grid>
            <ScrollRestoration />
            <RouteAnnouncer />
        </>
    );
}
