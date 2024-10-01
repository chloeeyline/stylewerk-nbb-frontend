import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import { useEntry } from "./api/entries";

export default function EntriesEdit() {
    const { entryId } = useParams();
    const [result] = useEntry(entryId ?? "");

    const { ok, loading } = result;

    if (loading === true) {
        return <div>Loading...</div>;
    }

    if (ok === false) {
        const { error } = result;

        return <ErrorElement error={error} />;
    }

    const { id, name, rows } = result.entry;

    return (
        <Grid layout="headerFooter" className="size-block-100">
            <h1>
                Edit: {name} ({id})
            </h1>
            <ScrollContainer direction="both">
                <pre>
                    <code>{JSON.stringify(rows, undefined, 2)}</code>
                </pre>
            </ScrollContainer>
            <Link to={Routes.Entries.View.replace(RouteParams.EntryId, id)}>Back</Link>
        </Grid>
    );
}
