import { useLocation, useOutlet } from "react-router-dom";

import { Routes } from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/NavBar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Transition from "~/components/layout/Transition";
import { useTemplates } from "./api/templates";
import type { TemplateListResponse } from "./api/types";
import ListSidebar from "~/components/layout/ListSidebar";

const TemplatesResult = ({result}: { result: TemplateListResponse}) => {
    const { ok, loading } = result;

    if (loading === true) {
        return <div>Loading...</div>;
    }

    if (ok === false) {
        const { error } = result;

        return <ErrorElement error={error} />;
    }

    const {  general, folders } = result;

    return (
        <>
            {general.length >= 1 && (
                <MemoNavbar
                    direction="vertical"
                    routes={general.map(({ id, name }) => [`${Routes.TemplatesList}/${id}`, name])}
                />
            )}
            {folders.length >= 1 && (
                <ul>
                    {folders.map(({ id, name, templates }) => (
                        <li key={id}>
                            {name}
                            <MemoNavbar
                                direction="vertical"
                                routes={templates.map(({ id, name }) => [
                                    `${Routes.TemplatesList}/${id}`,
                                    name,
                                ])}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );


}

const TemplatesList = ({pathname}: { pathname: string}) => {
    const [result, refresh] = useTemplates();

    return (
        <ListSidebar
            collapsed={pathname === Routes.TemplatesList}
            onRefresh={refresh}
            refreshing={result.loading}>
            <TemplatesResult result={result} />
        </ListSidebar>
    );
};

export default function TemplatesLayout() {
    const { pathname } = useLocation();

    /**
     * Can't use the Outlet Component itself.
     * It would not work with the page transitions from React Transition Group.
     * see: https://reactcommunity.org/react-transition-group/with-react-router/
     */
    const outlet = useOutlet();

    return (
        <Grid
            layout="sidebarStart"
            className="size-block-100 gap"
            style={{ "--gap": "1rem" }}>
            <TemplatesList pathname={pathname} />
            <ScrollContainer direction="vertical">
                <Transition
                    transition="fadeVertical"
                    transitionKey={pathname}
                    scrollContainer="vertical">
                    {outlet}
                </Transition>
            </ScrollContainer>
        </Grid>
    );
}
