import type React from "react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "~/components/forms/InputField";
import Grid from "~/components/layout/Grid";
import ScrollContainer from "~/components/layout/ScrollContainer";
import BackendRoutes from "~/constants/backend-routes";
import RouteParams from "~/constants/route-params";
import { translationContentSchema, translationSchema } from "~/schemas/translations-schema";
import type { Translation, TranslationContent } from "~/schemas/translations-schema";
import Ajax from "~/utils/ajax";
import { updateLanguage } from "./update";

type TranslationState = {
    loading: boolean;
    error: string | null;
    code: string;
    name: string;
    data: TranslationContent;
};

const getLanguage = async (
    code: string,
    failureCode?: string,
): Promise<
    | { ok: true; code: string; name: string; data: TranslationContent }
    | { ok: false; error: string }
> => {
    const response = await Ajax.get(BackendRoutes.Language.Details, { search: { code } });

    if (response.ok === false) {
        if (code === "de")
            return {
                ok: false,
                error: response.error.message,
            };
        return await getLanguage("de", code);
    }

    const result = await translationSchema.safeParseAsync(response.result);

    if (result.success === false || result.data.data === null) {
        if (code === "de")
            return {
                ok: false,
                error: result?.error?.message ?? "Data is unset",
            };
        return await getLanguage("de", code);
    }

    try {
        const translationResult = await translationContentSchema.safeParseAsync(
            JSON.parse(result.data.data),
        );

        if (translationResult.success === false) {
            if (code === "de") {
                return {
                    ok: false,
                    error: translationResult.error.message,
                };
            }
            return await getLanguage("de", code);
        }

        return {
            ok: true,
            code: typeof failureCode === "string" ? failureCode : result.data.code,
            name: typeof failureCode === "string" ? "" : result.data.name,
            data: translationResult.data,
        };
    } catch (error) {
        if (code === "de") {
            return {
                ok: false,
                error: "Something went wrong!",
            };
        }
        return await getLanguage("de", code);
    }
};

const Editor = ({
    translationState,
    setTranslationState,
}: {
    translationState: TranslationState;
    setTranslationState: React.Dispatch<TranslationState>;
}) => {
    return (
        <div style={{ display: "grid" }} className="gap-1">
            {Object.entries(translationState.data).map(([ns, translations]) => (
                <div key={ns} style={{ display: "grid" }} className="gap-1">
                    {Object.entries(translations).map(([key, value]) => (
                        <div key={key} style={{ display: "grid", gridTemplateColumns: "auto 1fr" }} className="gap-1">
                            <span>
                                {ns}.{key}:
                            </span>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                    const newTranslationState = { ...translationState };

                                    newTranslationState.data[ns][key] = e.target.value;

                                    setTranslationState(newTranslationState);
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default function AdminTranslationsManage() {
    const { translationId } = useParams();

    const [translationState, setTranslationState] = useState<TranslationState>({
        loading: false,
        error: null,
        code: translationId ?? RouteParams.TranslationId,
        name: "",
        data: {},
    });

    const fetchTranslationContent = async () => {
        if (translationState.loading === true) return;

        setTranslationState({
            ...translationState,
            loading: true,
        });

        if (translationState.code === RouteParams.TranslationId) {
            setTranslationState({
                ...translationState,
                error: "Invalid translation-id",
                loading: false,
            });
            return;
        }

        const result = await getLanguage(translationState.code);

        if (result.ok === false) {
            setTranslationState({
                ...translationState,
                error: result.error,
                loading: false,
            });
            return;
        }

        setTranslationState({
            ...translationState,
            name: result.name,
            error: null,
            data: result.data,
            loading: false,
        });
    };

    useEffect(() => {
        fetchTranslationContent();
    }, [translationId]);

    if (translationState.code === RouteParams.TranslationId) {
        return <div>No id given</div>;
    }

    return (
        <Grid layout="header" className="size-block-100">
            <h1>Admin - TranslationsManage</h1>
            <ScrollContainer direction="vertical">
                <Grid layout="headerFooter" className="size-block-100 gap-1-rem">
                    <div>
                        <InputField
                            label="Code"
                            name="code"
                            value={translationState.code}
                            readOnly
                        />
                        <InputField
                            label="Name"
                            name="name"
                            value={translationState.name}
                            onChange={(e) => {
                                setTranslationState({
                                    ...translationState,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <ScrollContainer direction="vertical">
                        <Editor
                            translationState={translationState}
                            setTranslationState={setTranslationState}
                        />
                    </ScrollContainer>
                    <div>
                        <button
                            type="button"
                            onClick={async () => {
                                const { code, name, data } = translationState;

                                if (name.trim() === "") {
                                    setTranslationState({
                                        ...translationState,
                                        error: "Please enter a name!",
                                    });
                                    return;
                                }

                                const result = await updateLanguage(code, name, data);

                                if (result.ok === false) {
                                    setTranslationState({
                                        ...translationState,
                                        error: result.error.message,
                                    });
                                    return;
                                }

                                await fetchTranslationContent();
                            }}>
                            Save
                        </button>
                    </div>
                </Grid>
            </ScrollContainer>
        </Grid>
    );
}
