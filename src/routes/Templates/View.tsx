import { Link, useParams } from "react-router-dom";

import { RouteParams } from "#/route-params";
import { Routes } from "#/routes";
import ErrorElement from "~/components/general/ErrorElement";
import { useTemplate } from "./api/templates";

export default function TemplateView() {
    const { templateId } = useParams();
    const [result] = useTemplate(templateId ?? "");

    const { ok, loading } = result;

    if (loading === true) {
        return <div>Loading...</div>;
    }

    if (ok === false) {
        const { error } = result;

        return <ErrorElement error={error} />;
    }

    const { id, name, rows } = result.template;

    return (
        <div>
            <h1>
                {name} ({id})
            </h1>
            <pre>
                <code>{JSON.stringify(rows, undefined, 2)}</code>
            </pre>
            <Link to={Routes.TemplateEdit.replace(RouteParams.TemplateId, id)}>Edit</Link>
        </div>
    );
}
