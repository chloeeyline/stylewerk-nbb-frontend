import { Outlet, ScrollRestoration } from "react-router-dom";

import Frontend from "#/routes";
import { useTranslation } from "react-i18next";
import Grid from "~/components/layout/Grid";
import { MemoNavbar, NavbarRoute } from "~/components/layout/NavBar";
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
            url: Frontend.Home,
            name: t("nav.homepage"),
        },
        loggedIn
            ? {
                  type: "link",
                  url: Frontend.Entries.List,
                  name: t("nav.entries"),
              }
            : undefined,
        loggedIn
            ? {
                  type: "link",
                  url: Frontend.Templates.List,
                  name: t("nav.templates"),
              }
            : undefined,
        isAdmin
            ? {
                  type: "link",
                  url: Frontend.Admin.Index,
                  name: t("nav.admin"),
              }
            : undefined,
        loggedIn
            ? {
                  type: "link",
                  url: Frontend.User.Index,
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
                  url: Frontend.Login,
                  name: t("nav.login"),
              }
            : undefined,
        !loggedIn
            ? {
                  type: "link",
                  url: Frontend.Registration,
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
                <div>
                    <RootNavBar />
                </div>
                <ScrollContainer direction="vertical" className="p-i-2">
                    <Outlet />
                </ScrollContainer>
            </Grid>
            <ScrollRestoration />
            <RouteAnnouncer />
        </>
    );
}
