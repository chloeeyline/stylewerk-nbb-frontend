import { Outlet, ScrollRestoration } from "react-router-dom";

import Routes from "#/routes";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/NavBar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { selectUser } from "~/redux/features/user/user-slice";
import { useAppSelector } from "~/redux/hooks";

const RootNavBar = () => {
    const user = useAppSelector(selectUser);
    const userIsLoggedIn = user.status === "loggedIn";
    const userIsAdmin = userIsLoggedIn && user.admin === true;

    const routes = [
        [Routes.Home, "Home"],
        [Routes.Entries.List, "Entries"],
        [Routes.Templates.List, "Templates"],
        userIsAdmin ? [Routes.Admin.Index, "Admin"] : undefined,
        userIsLoggedIn ? [Routes.User.Index, "User"] : undefined,
        userIsLoggedIn === false ? [Routes.Login, "Login"] : undefined,
        userIsLoggedIn === false ? [Routes.Registration, "Registration"] : undefined,
    ].filter((route): route is [path: string, name: string] => {
        if (
            typeof route !== "undefined" &&
            Array.isArray(route) &&
            route.length === 2 &&
            typeof route[0] === "string" &&
            typeof route[1] === "string"
        ) {
            return true;
        }

        return false;
    });

    return <MemoNavbar routes={routes} />;
};

export default function RootLayout() {
    return (
        <>
            <Grid layout="header" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
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
