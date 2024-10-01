import { ScrollRestoration, useLocation, useOutlet, useParams } from "react-router-dom";

import { Routes } from "#/routes";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/NavBar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Transition from "~/components/layout/Transition";
import { selectUser } from "~/redux/features/user/userSlice";
import { useAppSelector } from "~/redux/hooks";

export default function RootLayout() {
    const { pathname } = useLocation();
    const { entryId, templateId } = useParams();

    const id = entryId ?? templateId;

    /**
     * Can't use the Outlet Component itself.
     * It would not work with the page transitions from React Transition Group.
     * see: https://reactcommunity.org/react-transition-group/with-react-router/
     */
    const outlet = useOutlet();

    const user = useAppSelector(selectUser);
    const userIsLoggedIn = user.status === "loggedIn";
    const userIsAdmin = userIsLoggedIn && user.admin === true;

    const routes = [
        [Routes.Home, "Home"],
        [Routes.EntriesList, "Entries"],
        [Routes.TemplatesList, "Templates"],
        userIsAdmin ? [Routes.Admin, "Admin"] : undefined,
        userIsLoggedIn ? [Routes.User, "User"] : undefined,
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

    return (
        <>
            <Grid layout="header" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
                <MemoNavbar routes={routes} />
                <ScrollContainer direction="vertical">
                    <Transition
                        transition="fadeHorizontal"
                        transitionKey={
                            typeof id !== "string" ? pathname : pathname.replace(`/${id}`, "")
                        }
                        scrollContainer="vertical">
                        {outlet}
                    </Transition>
                </ScrollContainer>
            </Grid>
            <ScrollRestoration />
            <RouteAnnouncer />
        </>
    );
}
