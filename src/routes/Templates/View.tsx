import { Link, useParams } from "react-router-dom";

import RouteParams from "#/route-params";
import Routes from "#/routes";
import { useEffect } from "react";
import ErrorElement from "~/components/general/ErrorElement";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import {
    copyTemplates,
    detailTemplates,
    removeTemplates,
    selectTemplate,
} from "~/redux/features/template/template-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function TemplateView() {
    const { templateId } = useParams();
    const template = useAppSelector(selectTemplate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!templateId) return;
        dispatch(detailTemplates({ id: templateId }));
    }, [templateId]);

    const { status, detail } = template;

    if (status === "idle") {
        return null;
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error...</div>;
    }

    /* if (
        !("detail" in template) ||
        typeof template.detail !== "object" ||
        template.detail === null ||
        !("id" in template.detail) ||
        typeof template.detail.id !== "string"
    ) {
        return <div>Loading...</div>;
    } */

    return (
        <Grid layout="header" className="size-block-100">
            <ScrollContainer direction="both">
                <pre>
                    <code>{JSON.stringify(template.detail, undefined, 2)}</code>
                </pre>
                {typeof detail?.id === "string" ? (
                    <>
                        <button
                            onClick={() => {
                                if (typeof detail?.id !== "string") return;
                                dispatch(copyTemplates({ id: detail.id }));
                            }}>
                            Copy
                        </button>
                        <button
                            onClick={() => {
                                if (typeof detail?.id !== "string") return;
                                dispatch(removeTemplates({ id: detail.id }));
                            }}>
                            Delete
                        </button>
                        <Link to={Routes.Templates.Edit.replace(RouteParams.TemplateId, detail.id)}>
                            Edit
                        </Link>
                    </>
                ) : null}
            </ScrollContainer>
        </Grid>
    );
}
