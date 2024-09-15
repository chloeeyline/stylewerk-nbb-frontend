import { useLocation, useOutlet } from "react-router-dom";

import { Routes } from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import { MemoNavbar } from "~/components/layout/Navbar";
import FadeVertical from "~/components/layout/Transition/FadeVertical";
import { useEntries } from "./api/entries";

const EntriesList = () => {
    const [result, refresh] = useEntries();

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
        <div>
            <button onClick={refresh}>Refresh</button>
            {general.length >= 1 && (
                <MemoNavbar
                    direction="vertical"
                    routes={result.general.map(({ id, name }) => [
                        `${Routes.EntriesList}/${id}`,
                        name,
                    ])}
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
        </div>
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
        <Grid
            layout="auto-1fr-horizontal"
            className="block-size-100 gap-dynamic"
            style={{ "--gap": "1rem" }}>
            <EntriesList />
            <FadeVertical transitionKey={pathname}>{outlet}</FadeVertical>
        </Grid>
    );
}
