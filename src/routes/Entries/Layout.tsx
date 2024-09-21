import { useLocation, useOutlet } from "react-router-dom";

import { Routes } from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ListSidebar from "~/components/layout/ListSidebar";
import { MemoNavbar } from "~/components/layout/NavBar";
import ScrollContainer from "~/components/layout/ScrollContainer";
import Transition from "~/components/layout/Transition";
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
                    routes={general.map(({ id, name }) => [`${Routes.EntriesList}/${id}`, name])}
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
                                    `${Routes.EntriesList}/${id}`,
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

const EntriesList = ({ pathname }: { pathname: string }) => {
    const [result, refresh] = useEntries();

    return (
        <ListSidebar
            collapsed={pathname === Routes.EntriesList}
            onRefresh={refresh}
            refreshing={result.loading}>
            <EntriesResult result={result} />
        </ListSidebar>
    );
};

export default function EntriesLayout() {
    const { pathname } = useLocation();

    /**
     * Can't use the Outlet Component itself.
     * It would not work with the page transitions from React Transition Group.
     * see: https://reactcommunity.org/react-transition-group/with-react-router/
     */
    const outlet = useOutlet();

    return (
        <Grid layout="sidebarStart" className="size-block-100 gap" style={{ "--gap": "1rem" }}>
            <EntriesList pathname={pathname} />
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
