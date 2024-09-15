import { Link, useParams } from "react-router-dom";

import { RouteParams } from "#/route-params";
import { Routes } from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import { useEntry } from "./api/entries";

export default function EntryView() {
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
        <div>
            <h1>
                {name} ({id})
            </h1>
            <pre>
                <code>{JSON.stringify(rows, undefined, 2)}</code>
            </pre>
            <Link to={Routes.EntryEdit.replace(RouteParams.EntryId, id)}>Edit</Link>
        </div>
    );
}
