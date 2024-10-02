import { Outlet, ScrollRestoration } from "react-router-dom";

import Frontend from "#/routes";
import Grid from "~/components/layout/Grid";
import { MemoNavbar, NavbarRoute } from "~/components/layout/NavBar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { logoutUser, selectUser } from "~/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

const RootNavBar = () => {
    const user = useAppSelector(selectUser);

    const loggedIn = user.status === "loggedIn";
    const isAdmin = loggedIn && user.admin === true;

    const dispatch = useAppDispatch();

    const routes: (NavbarRoute | undefined)[] = [
        { type: "link", url: Frontend.Home, name: "Home" },
        { type: "link", url: Frontend.Entries.List, name: "Entries" },
        { type: "link", url: Frontend.Templates.List, name: "Templates" },
        isAdmin ? { type: "link", url: Frontend.Admin.Index, name: "Admin" } : undefined,
        loggedIn ? { type: "link", url: Frontend.User.Index, name: "User" } : undefined,
        loggedIn
            ? { type: "button", onClick: () => dispatch(logoutUser()), name: "Logout" }
            : undefined,
        !loggedIn ? { type: "link", url: Frontend.Login, name: "Login" } : undefined,
        !loggedIn ? { type: "link", url: Frontend.Registration, name: "Registration" } : undefined,
    ];

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
