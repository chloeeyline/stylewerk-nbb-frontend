import type React from "react";
import { memo } from "react";
import { ScrollRestoration, useLocation, useOutlet, useParams } from "react-router-dom";

import { Routes } from "#/routes";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/Navbar";
import RouteAnnouncer from "~/components/layout/RouteAnnouncer";
import Transition from "~/components/layout/Transition";
import ScrollContainer from "~/components/layout/ScrollContainer";

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
