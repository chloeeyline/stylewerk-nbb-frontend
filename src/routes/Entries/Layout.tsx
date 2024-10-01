import { Outlet, useLocation } from "react-router-dom";

import Routes from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ListSidebar from "~/components/layout/ListSidebar";
import { MemoNavbar } from "~/components/layout/NavBar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useEntries } from "./api/entries";
import type { EntryListResponse } from "./api/types";

const EntriesResult = ({ result }: { result: EntryListResponse }) => {
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
                    routes={general.map(({ id, name }) => [`${Routes.Entries.List}/${id}`, name])}
                />
            )}
            {folders.length >= 1 && (
                <ul>
                    {folders.map(({ id, name, entries }) => (
                        <li key={id}>
                            {name}
                            <MemoNavbar
                                direction="vertical"
                                routes={entries.map(({ id, name }) => [
                                    `${Routes.Entries.List}/${id}`,
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

const EntriesList = () => {
    const { pathname } = useLocation();
    const [result, refresh] = useEntries();

    return (
        <ListSidebar
            collapsed={pathname === Routes.Entries.List}
            onRefresh={refresh}
            refreshing={result.loading}>
            <EntriesResult result={result} />
        </ListSidebar>
    );
};

export default function EntriesLayout() {
    return (
        <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <EntriesList />
            <ScrollContainer direction="vertical">
                <Outlet />
            </ScrollContainer>
        </Grid>
    );
}
