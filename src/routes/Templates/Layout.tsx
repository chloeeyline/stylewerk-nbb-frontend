import { Outlet, useLocation } from "react-router-dom";

import Routes from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ListSidebar from "~/components/layout/ListSidebar";
import { MemoNavbar } from "~/components/layout/NavBar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useTemplates } from "./api/templates";
import type { TemplateListResponse } from "./api/types";

const TemplatesResult = ({ result }: { result: TemplateListResponse }) => {
    const { ok, loading } = result;

    if (loading === true) {
        return <div>Loading...</div>;
    }

    if (ok === false) {
        const { error } = result;

        return <ErrorElement error={error} />;
    }

    const { general, folders } = result;

    return (
        <>
            {general.length >= 1 && (
                <MemoNavbar
                    direction="vertical"
                    routes={general.map(({ id, name }) => [`${Routes.Templates.List}/${id}`, name])}
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
                                    `${Routes.Templates.List}/${id}`,
                                    name,
                                ])}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

const TemplatesList = () => {
    const { pathname } = useLocation();
    const [result, refresh] = useTemplates();

    return (
        <ListSidebar
            collapsed={pathname === Routes.Templates.List}
            onRefresh={refresh}
            refreshing={result.loading}>
            <TemplatesResult result={result} />
        </ListSidebar>
    );
};

export default function TemplatesLayout() {
    return (
        <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <TemplatesList />
            <ScrollContainer direction="vertical">
                <Outlet />
            </ScrollContainer>
        </Grid>
    );
}
