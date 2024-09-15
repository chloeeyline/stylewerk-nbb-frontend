import type React from "react";
import { memo } from "react";
import { ScrollRestoration, useLocation, useOutlet, useParams } from "react-router-dom";

import { Routes } from "#/routes";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/Navbar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import FadeHorizontal from "~/components/layout/Transition/FadeHorizontal";

/**
 * We can't declare this tiny component inline, because it would break the transition.
 * I suspect the element gets destroyed, react looses track of it and then it gets recreated.
 */
const Main: React.ElementType = memo((props) => <main {...props} />);

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

    return (
        <>
            <Grid
                layout="auto-1fr-vertical"
                className="block-size-100 gap-dynamic"
                style={{ "--gap": "1rem" }}>
                <MemoNavbar
                    routes={[
                        [Routes.Home, "Home"],
                        [Routes.EntriesList, "Entries"],
                        [Routes.TemplatesList, "Templates"],
                        [Routes.Admin, "Admin"],
                    ]}
                />
                <FadeHorizontal
                    transitionKey={
                        typeof id !== "string" ? pathname : pathname.replace(`/${id}`, "")
                    }
                    Component={Main}>
                    {outlet}
                </FadeHorizontal>
            </Grid>
            <ScrollRestoration />
            <RouteAnnouncer />
        </>
    );
}
